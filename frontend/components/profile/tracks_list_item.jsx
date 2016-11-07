import React from "react";
import { Link } from "react-router";

const timeToStr = (duration) => {
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

const TracksListItem = ({track}) => {
  return (
    <div id="track-info-container" className="track-info-container">
      <p id="track-info-title" className="track-info-title">
      {track.title}
      </p>
      <Link to="" onClick={(e) => (e.preventDefault())/*playTrack(track.id)*/}>Play</Link>
      <p id="track-info-length" className="track-info-length">
      {timeToStr(track.length)}
      </p>
    </div>
  );
}

export default TracksListItem;
