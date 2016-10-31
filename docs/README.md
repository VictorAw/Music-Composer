# Music-Composer

[Music-Composer live][heroku]

[heroku]: http://victor-aw-music-composer.herokuapp.com

Music Composer is a full-stack web application that allows a user to compose a music track by dragging and dropping blocks representing music notes into a timeline. It utilizes Ruby on Rails on the back-end, PostgreSQL for the database, and React.js along with Redux for the front-end.

# Features & Implementation

### Track Creation and Editing

Tracks are stored in the database in one table containing the track id and the composer's id. Tracks are connected to the Notes within that track through a join table connecting each Track to the Notes associated with that Track. On login, Tracks belonging to the logged in user are fetched by an API call through a fetch table and held within the `current_user` section of the Redux store.

Note data drawn onto an HTML canvas using the Konva library using React Konva. The user will interact with the canvas through events, allowing the user to click on and drag and drop items on the canvas. Each interaction the user has with the canvas will update the note data in the store.

When the user clicks the save button, the tracks will be saved from the store into the database through an API call.

### Users

Users are stored in a table in the database and have an associated description to render in the Profile component. Each user is connected to their associated Tracks through a join table joining each Track's `composer_id` with the User's `id`.

