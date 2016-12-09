import React from "react";
import TracksListItemContainer from "./tracks_list_item_container";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestUser(this.props.params.userId);
  }

  descriptionArea() {
    if (this.props.selectedUser.id === this.props.currentUser.id) {
      return (
        <form 
          className="profile-description-form"
          onSubmit={this.formSubmit}>
          <textarea 
            className="profile-description-textarea"
            defaultValue={this.props.selectedUser.description}>
          </textarea>
          <button 
            className="profile-description-update-button">
            Update Description
          </button>
        </form>
      )
    }
    else {
      return (
        <p
          className="profile-description">
          { this.props.selectedUser.description }
        </p> 
      )
    }
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
            { this.descriptionArea() }
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
