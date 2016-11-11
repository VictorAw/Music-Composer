import React from "react";
import Workspace from "./workspace/workspace";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChannel: 0
    }
  }

  componentWillMount() {
    if (this.props.params.trackId) {
      this.props.requestTrack(this.props.params.trackId);
    }
  }

  handleNoteBlockClick(channel_idx) {
    return (note_idx) => (note) => {
      this.props.updateNoteInTrack(channel_idx, note_idx, note);
    }
  }

  render() {
    return (
      <div className="editor-container">
        <div className="editor-workspace-row">
          <Workspace
            track={this.props.track}
            selectedChannel={0}
            updateNoteInTrack={
              this.handleNoteBlockClick(
                this.state.selectedChannel
            )}
          /> 
        </div>
      </div>
    );
  }
}

export default Editor;
