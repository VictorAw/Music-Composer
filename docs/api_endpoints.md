# API Endpoints

## HTML API

### Root
 - `GET /` - Loads React web app

## JSON API

### Users

 - `POST /api/users`
 - `GET  /api/user/:id`

### Session

 - `POST	 /api/session`
 - `DELETE /api/session`

### Tracks

 - `POST   /api/users/:id/tracks`
 - `SHOW   /api/users/:id/tracks/:track_id`
 - `PATCH  /api/users/:id/tracks/:track_id`
 - `DELETE /api/users/:id/tracks/:track_id`

### Notes

 - `POST   /api/users/:id/tracks/:track_id/notes`
 - `PATCH  /api/users/:id/tracks/:track_id/notes/:note_id`
 - `DELETE /api/users/:id/tracks/:track_id/notes/:note_id`
