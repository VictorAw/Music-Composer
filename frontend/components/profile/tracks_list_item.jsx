import React from "react";
import { Link } from "react-router";

class TracksListItem extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      play: {
        active: true,
        hover: false,
        enabled: true
      },
      pause: {
        enabled: false,
        hover: false
      }
    }
     
    this.queuedTrack = false

    // Bind handlers
    this.handlePlayMouseEnter = this.handlePlayMouseEnter.bind(this);
    this.handlePlayMouseLeave = this.handlePlayMouseLeave.bind(this);
    this.handlePauseMouseEnter = this.handlePauseMouseEnter.bind(this);
    this.handlePauseMouseLeave = this.handlePauseMouseLeave.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  handlePlayMouseEnter() {
    let newState = Object.assign(this.state);
    newState.play.hover = true;
    this.setState(newState);
  }

  handlePauseMouseEnter() {
    let newState = Object.assign(this.state);
    newState.pause.hover = true;
    this.setState(newState);
  }

  handlePlayMouseLeave() {
    let newState = Object.assign(this.state);
    newState.play.hover = false;
    this.setState(newState);
  }
  
  handlePauseMouseLeave() {
    let newState = Object.assign(this.state);
    newState.pause.hover = false;
    this.setState(newState);
  }

  handlePauseClick() {
    if (this.state.pause.enable) {
      this.props.player.track.pause();
      this.toggleStop();
    }
  }

  handlePlayClick() {
    // Toggle play button active and pause enabled
    let newState = Object.assign(this.state);
    newState.play.active = !this.state.play.active;
    newState.pause.enabled = !newState.pause.enabled;

    // If the track is playing, stop it. Otherwise, start playing
    if (newState.play.active) {
      this.props.player.track.stop(); 
    }
    else {
      this.props.requestTrack(this.props.trackInfo.id);
      this.queuedTrack = true;
    }
    
    this.setState(newState);
  }

  playButtonSrc() {
    if (this.state.play.active && !this.state.play.hover) {
      return "https://s18.postimg.org/ujml98lg9/play.png";
    }
    else if (this.state.play.active && this.state.play.hover) {
      return "https://s11.postimg.org/r3gtsuvpv/play_hover.png";
    }
    else if (!this.state.play.active && !this.state.play.hover) {
      return "https://s18.postimg.org/6ihl0grmx/stop.png";
    }
    else {
      return "https://s15.postimg.org/ax2bwrngb/stop_hover.png";
    }
  }

  pauseButtonSrc() {
    if (this.state.pause.enabled && !this.state.pause.hover) {
      return "https://s11.postimg.org/mq7diluxf/pause.png"; 
    }
    else if (this.state.pause.enabled && this.state.pause.hover) {
      return "https://s15.postimg.org/yb52psg1n/pause_hover.png";
    }
    else {
      return "https://s18.postimg.org/xwsj6mchl/pause_disable.png";
    }
  }

  timeToStr(duration) {
    // Calculate time from milliseconds
    let seconds = Math.floor(duration / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    // Modulus the seconds and minutes to fit the format
    seconds = seconds % 60;
    minutes = minutes % 60;

    // Pad the numbers if necessary
    let secondsStr = seconds > 9 ? "" + seconds : "0" + seconds;
    let minutesStr = minutes > 9 ? "" + minutes : "0" + minutes;
    let hoursStr = hours > 9 ? "" + hours : "0" + hours;

    return hoursStr + ":" + minutesStr + ":" + secondsStr;
  }

  componentDidUpdate() {
    if (this.queuedTrack && 
      this.props.trackInfo.id === this.props.track.id) {
      console.log("Ids match");
      this.queuedTrack = false;
      this.props.playTrack();
    }
  }

  render() {
    return (
      <div id="track-info-container" className="track-info-container">
        <div id="track-info" className="track-info">
          <p id="track-info-title" className="track-info-title">
          {this.props.trackInfo.title}
          </p>
          <p id="track-info-length" className="track-info-length">
          {this.timeToStr(this.props.trackInfo.length)}
          </p>
        </div>
        <div id="track-buttons" className="track-buttons">
          <div id="track-buttons-controls" className="track-buttons-controls">
            <Link to="" onClick={(e) => (e.preventDefault())/*playTrack(track.id)*/}>
              <img className="track-play-button" 
                   src={this.playButtonSrc()}
                   onMouseEnter={this.handlePlayMouseEnter}
                   onMouseLeave={this.handlePlayMouseLeave}
                   onClick={this.handlePlayClick}/>
            </Link>
            <Link to="" onClick={(e) => (e.preventDefault())/*playTrack(track.id)*/}>
              <img className="track-pause-button"
                   src={this.pauseButtonSrc()}
                   onMouseEnter={this.handlePauseMouseEnter}
                   onMouseLeave={this.handlePauseMouseLeave}
                   onClick={this.handlePauseClick}/>
            </Link>
          </div>
          <div id="track-buttons-edit" className="track-buttons-edit">
            <Link to="" onClick={(e) => (e.preventDefault())/*playTrack(track.id)*/}>Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TracksListItem;
