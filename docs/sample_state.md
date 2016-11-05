```js
{
  session: {
    currentUser: {
      id: 1,
      username: "victor_aw",
      email: "victor_aw@email.com",
      description: "I'm a hobbyist music composer."
      tracks: [
        { title: "Untitled", id: 1 },
        { title: "My first track", id: 2 }
      ]
    },
    errors: []
  },
  users: {
    users: {
      1: {
        id: 1,
        username: "victor_aw",
      },
      2: {
        id: 2,
        username: "breakfast" 
      }
    },
    selectedUser: {
      id: 2,
      username: "breakfast",
      description: "A real keyboard cat" 
    }
  },
  track: {
    id: 2, title: "My First Track", composer_id: 1,
    channels: [ // Arbitary number of channels
      { // First channel
        id: 1, track_id: 2,
        chords: [ 
          { // First Chord
            id: 1, channel_id: 1,
            notes: [
              { id: 1, freq: 392.00, // G4
                start_time: 0, end_time: 1500,
                start_vol: 25, end_vol: 100 }, 
              { id: 2, freq: 493.88, // B4
                start_time: 0, end_time: 1500,
                start_vol: 25, end_vol: 100 }, 
              { id: 3, freq: 587.33, // D5
                start_time: 0, end_time: 1500,
                start_vol: 25, end_vol: 100 } 
            ]
          }, { // Second Chord
            id: 2, channel_id: 1,
            notes: [
              { id: 4, freq: 440.00, // A4
                start_time: 1500, end_time: 3000,
                start_vol: 100, end_vol: 50 }, 
              { id: 6, freq: 523.25, // C5
                start_time: 1500, end_time: 3000,
                start_vol: 100, end_vol: 50 }, 
              { id: 9, freq: 659.25, // E5
                start_time: 1500, end_time: 3000,
                start_vol: 100, end_vol: 50 } 
            ]
          }
        ]
      }, { // Second channel
        id: 2, track_id: 2,
        chords: [
          {
            id: 3, channel_id: 2,
            notes: [ // First and only note
              { id: 60, freq: 164.81, // E3
                start_time: 0, end_time: 3000,
                start_vol: 50, end_vol: 50 }
            ]
          }
        ]
      }, { // Third channel
        id: 3, track_id: 2,
        chords: [ 
          { // First chord (single note)
            id: 4, channel_id: 3,
            notes: [
              { id:75, freq: 440.00, // A4
                start_time: 750, end_time: 950,
                start_vol: 100, end_vol: 100 }
            ]
          },
          { // Second chord (single note)
            id: 5, channel_id: 3,
            notes: [
              { id: 80, freq: 493.88, // B4
                start_time: 2250, end_time: 2450,
                start_vol: 100, end_vol: 100 }
            ]
          }
        ]
      }
    ]
  }
}



