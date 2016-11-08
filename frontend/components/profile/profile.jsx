import React from "react";
import TracksListItemContainer from "./tracks_list_item_container";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestUser(this.props.params.userId);
  }

  render() {
    return (
      <section id="profile-container" className="profile-container">
        <div id="profile-info" className="profile-info">
          <p id="profile-picture" 
             className="profile-picture">
             {"Placeholder for profile pic"}
          </p>
          <div id="profile-description-container" 
               className="profile-description-container">
             <p>{"Description placeholder. There will be lots of text here in the future, most likely. At least for people who have a lot ot say about themselves."}</p>
          </div>
        </div>
        <div id="track-list" className="track-list">
        {
          this.props.selectedUser.tracks.map((track) => (
            <TracksListItemContainer key={track.id} trackInfo={track}/>
          ))
        }
        </div>
      </section>
    );
  }
}

export default Profile;
