# Music-Composer

[Heroku link][heroku]
[Trello link][trello]

[heroku]: http://www.victor-aw-music-composer.herokuapp.com
[trello]: https://trello.com/b/3QoZnrEt/music-composition-app

Music Composer is a web application that allows users to produce 4-channel music tracks.

By week 9, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data, and sufficient CSS styling:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] Add, move, and remove note blocks from the track timeline
- [ ] Preview notes and play current track
- [ ] Save track to database
- [ ] Profile page
- [ ] Production Readme

## Design Docs
* [View wireframes][wireframes]
* [React components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: docs/wireframes
[components]: docs/component_hierarchy.md
[sample-state]: docs/sample_state.md
[api-endpoints]: docs/api_endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Frontend User Authentication (2 days)
**Objective:** Functioning rails project with front-end authentication

### Phase 2: Models, API, and components (2 days)
**Objective:** Tracks and users can be created, read, edited, and destroyed through the API.

### Phase 3: Music editor (3 days)
**Objective:** Canvas music editor is interactive and allows the user to edit the music track visually

### Phase 4: Music playback (3 days)
**Objective:** Music track can be played through the browser's web audio api

### Bonus Features (TBD)
- [ ] Grid-style visual editor in addition to the block-style note editor
- [ ] Ability to export the music track as a .midi, .wav, or .ogg file
