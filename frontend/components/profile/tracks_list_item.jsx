import React from "react";

const timeToStr = (duration) => {
  let seconds = duration / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;

  return `${seconds % 60}:${minutes % 60}:${hours}`;
}

const TracksListItem = (track) => (
  <div id="track-info-container" className="track-info-container">
    <p id="track-info-title" className="track-info-title">
    {track.title}
    </p>
    <Link to="#" onClick={playTrack(track.id)}>Play</Link>
    <p> id="track-info-duration" className="track-info-duration">
    {timeToStr(track.end_time - track-start_time))}
    </p>
  </div>
)

export default TracksListItem;
