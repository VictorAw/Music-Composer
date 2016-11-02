```js
{
  currentUser: {
    id: 1,
    username: "victor_aw",
    description: "I'm a hobbyist music composer."
    tracks: [
      { title: "Untitled", id: 1 },
      { title: "My first track", id: 2 }
    ]
  },
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
    descriptoin: "A real keyboard cat" 
  },
  forms: {
    signUp: { errors: [] },
    logIn: { errors: [] }
  },
  track: {
    id: 2
    title: "My First Track",
    composer_id: 1,
    notes: [ // Arbitary number of channels
      [ // First Channel
        // First chord
        [ { freq: 392.00, // G4
            start_time: 0, end_time: 1500,
            start_vol: 25, end_vol: 100 }, 
          { freq: 493.88, // B4
            start_time: 0, end_time: 1500,
            start_vol: 25, end_vol: 100 }, 
          { freq: 587.33, // D5
            start_time: 0, end_time: 1500,
            start_vol: 25, end_vol: 100 } ],
        // Second chord
        [ { freq: 440.00, // A4
            start_time: 1500, end_time: 3000,
            start_vol: 100, end_vol: 50 },
          { freq: 523.25, // C5 
            start_time: 1500, end_time: 3000,
            start_vol: 100, end_vol: 50 },
          { freq: 659.25, // E5 
            start_time: 1500, end_time: 3000,
            start_vol: 100, end_vol: 50 },
      ], 
      [ // Second channel
        // First and only note
        [ { freq: 164.81 // E3
            start_time: 0, end_time: 3000 },
            start_vol: 50, end_vol: 50 ]
      ], 
      [ // Third channel
        // First note
        [ { freq: 440.00 // A4
            start_time: 750, end_time: 950,
            start_vol: 100, end_vol: 100 } ],
        // Second note
        [ { freq: 493.88 // B4
            start_time: 2250, end_time: 2450,
            start_vol: 100, end_vol: 100 } ]
      ]
    ]
  }
}
