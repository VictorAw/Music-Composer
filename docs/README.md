# Music-Composer

[Music Composer live][heroku]

[heroku]: http://victor-aw-music-composer.herokuapp.com

Music Composer is a full-stack web application that allows a user to compose a music track by dragging and dropping blocks representing music notes into a timeline. It utilizes Ruby on Rails on the back-end, PostgreSQL for the database, and React.js along with Redux for the front-end.

![Screenshot]
(https://postimg.org/image/emhr1c7ht/ff2b0f36/)

# Features & Implementation

### Track Creation and Editing

Tracks are stored in the database in a table and connected to the Notes table through ActiveRecord associations. A Track has many Channels, which in turn have many Notes. The ActiveRecord associations are made in such a way that a Track object can be created all at once, with ActiveRecord automatically updating the Notes table with the new state.

In the editor, all Notes in the selected Channel of the currently edited Track are rendered to the workspace through React Konva. The user interacts with the React Konva components to edit the state of the Track in the redux store and then can save the redux store's Track into the database by pressing the "Save Track" button on the editor.

### Music Playback

Tracks can be played back through an API written that will use the Track data in the redux store to generate a Web Audio API AudioContext, the Oscillators required to play the notes, and one GainNode for each Oscillator. Due to the number of Oscillators and GainNodes being produced, only ten thousand notes are generated every second so that the impact on the user's experience is minimized. Ten thousand notes can be generated in approximately 0.2 seconds on the machine used for testing the website.

### Users

Users are stored in a table in the database. An API call to get a single user will also provide a list of the track titles and ids of tracks created by the chosen user.

## Future Directions for the Project

After the features above have been implemented, the following features may be added:

Save tracks as .midi, .wav, and/or .ogg files
Browse and search through users and their tracks
Upload profile pictures
Remove channels from a track
Change the Oscillator's waveform
View note data in a sidebar in the editor
Alter note volume data in the note data sidebar
