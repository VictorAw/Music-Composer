import React from "react";
import TracksListItem from "./tracks_list_item";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    <section id="profile-container" className="profile-container">
      <div id="profile-info" className="profile-info">
        <p>{"Placeholder for profile pic"}</p>
        <div id="profile-description-container" 
             className="profile-description-container">
           <p>{"Description placeholder"}</p>
        </div>
      </div>
      {
        this.props.user.tracks.map((track) => (
          <TracksListItem track={track}/>
        ))
      }
    </section>
  }

export default Profile;
