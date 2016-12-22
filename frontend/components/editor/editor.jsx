import React from "react";
import Workspace from "./workspace/workspace";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChannel: 0,
      scrolling: false
    }

    this.selectChannel = this.selectChannel.bind(this);
    this.saveTrack = this.saveTrack.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.addChannel = this.addChannel.bind(this);
    this.updateTrackTitle = this.updateTrackTitle.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    if (this.props.params.trackId) {
      this.props.requestTrack(this.props.params.trackId);
    }

    this.ctxMenu = window.oncontextmenu;
    window.oncontextmenu = () => (false);
  }

  componentWillUnmount() {
    this.props.stopTrack();
    window.oncontextmenu = this.ctxMenu;
  }

  updateNoteInTrack(channel_idx) {
    return (note_idx) => (note) => {
      this.props.updateNoteInTrack(channel_idx, note_idx, note);
    }
  }

  handleNoteBlockClick(channel_idx) {
    return (note_idx) => (e) => {
      if (e.evt.which === 3) {
        this.props.removeNoteFromTrack(channel_idx, note_idx);
      }
    }
  }

  addNoteToTrack(channel_idx) {
    return (note) => {
      this.props.addNoteToTrack(channel_idx, note);
    }
  }

  selectChannel(idx) {
    return (e) => {
      e.preventDefault();
      this.setState({selectedChannel: idx});
    } 
  }

  saveTrack(e) {
    e.preventDefault();
    if (this.props.router.location.pathname === "/edit") {
      this.props.createTrack(this.props.track);
    }
    else {
      this.props.updateTrack(this.props.track);
    }
  }

  playTrack(e) {
    if (e) {
      e.preventDefault();
    }

    if (this.state.scrolling) {
      this.stopTrack();
    }

    this.props.playTrack();
    this.setState({scrolling: true});
    this.playTrackHandle = setInterval(() => {
      if (!this.props.player.track.playing) {
        this.stopTrack();
      }
    }, 100);
  }

  stopTrack(e) {
    if (e) {
      e.preventDefault();
    }
    clearInterval(this.playTrackHandle);
    this.props.stopTrack();
    this.setState({scrolling: false});
  }

  addChannel(e) {
    e.preventDefault();
    this.props.addChannelToTrack({notes_attributes: []});
  }

  updateTrackTitle(e) {
    this.props.updateTrackTitle(e.nativeEvent.target.value);
  }

  goBack(e) {
    e.preventDefault();
    this.props.router.goBack();
  }

  render() {
    //console.log(this.props);
    //console.log("Track info", this.props.track.playing, this.props.player.track);
    let track = this.props.track;
    let channelData = track.channels_attributes;
    let channels = [];
    channelData.forEach((channel, idx) => {
      channels.push(
        <a href="#" 
           key={idx}
           role="button"
           className="editor-channel-button"
           onClick={this.selectChannel(idx)}>
          {"Channel " + (idx + 1)}
        </a>
      ) 
    });
    channels.push(
      <a href="#"
        key={"new channel"}
        role="button"
        className="editor-channel-button"
        onClick={this.addChannel}>
        +
      </a>
    )
console.log("rendering");
    return (
      <div className="editor-container">
        <a href="#"
           role="button"
           className="editor-back-button"
           onClick={this.goBack}>
           {"🡨 Back"}
        </a>
        <div className="editor-workspace-row">
          <div className="editor-left-sidebar">
            <input className="editor-title-input"
                   value={this.props.track.title}
                   onChange={this.updateTrackTitle} />
            <div className="editor-channel-button-container">
              {channels} 
            </div>
            <div className="editor-note-track-info">
              <div className="editor-track-buttons">
                <a href="#"
                   role="button"
                   className="editor-track-button"
                   onClick={this.saveTrack}>
                   {"Save track"}
                </a>
                <a href="#"
                   role="button"
                   className="editor-track-button"
                   onClick={this.playTrack}>
                   {"Play track"}
                </a>
              </div>
            </div>
          </div>
          <Workspace
            track={this.props.track}
            selectedChannel={this.state.selectedChannel}
            scrolling={this.state.scrolling}
            updateNoteInTrack={
              this.updateNoteInTrack(
                this.state.selectedChannel
            )}
            handleNoteBlockClick={
              this.handleNoteBlockClick(
                this.state.selectedChannel 
            )}
            addNoteToTrack={
              this.addNoteToTrack(
                this.state.selectedChannel
            )}
          />
        </div>
      </div>
    );
  }
}

export default Editor;
