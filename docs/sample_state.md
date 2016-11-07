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
        vol: 1,
        notes: [
          { id: 1, freq: 392.00, // G4
            starting_quarter_beat: 0,
				    ending_quarter_beat: 6,
            start_vol: 0.25, end_vol: 1 }, 
          { id: 2, freq: 493.88, // B4
            starting_quarter_beat: 0,
				    ending_quarter_beat: 6,
            start_vol: 0.25, end_vol: 1 }, 
          { id: 3, freq: 587.33, // D5
            starting_quarter_beat: 0,
            ending_quarter_beat: 6,
            start_vol: 0.25, end_vol: 1 },
          { id: 4, freq: 440.00, // A4
            starting_quarter_beat 12,
            ending_quarter_beat: 24,
            start_vol: 1, end_vol: 0.5 }, 
          { id: 6, freq: 523.25, // C5
            starting_quarter_beat 12,
            ending_quarter_beat: 24,
            start_vol: 1, end_vol: 0.5 }, 
          { id: 9, freq: 659.25, // E5
            starting_quarter_beat 12,
            ending_quarter_beat: 24,
            start_vol: 1, end_vol: 0.5 } 
        ]
      }, { // Second channel
        id: 2, track_id: 2,
        vol: 1,
        notes: [
          { id: 60, freq: 164.81, // E3
            starting_quarter_beat: 0,
				    ending_quarter_beat: 24,
            start_vol: 0.5, end_vol: 0.5 }
        ]
      }, { // Third channel
        id: 3, track_id: 2,
        vol: 0.5,
        notes: [ 
          { id:75, freq: 440.00, // A4
            starting_quarter_beat: 6, 
            ending_quarter_beat: 8,
            start_vol: 1, end_vol: 1 },
          { id: 80, freq: 493.88, // B4
            starting_quarter_beat: 10, 
            ending_quarter_beat: 12,
            start_vol: 1, end_vol: 1 }
        ]
      }
    ]
  },
  player: {
    notes: [ // Generated through an api call where the track is sent in as a Track and the server returns the notes
      { id: 1, freq: 392.00, // G4
        starting_quarter_beat: 0,
				ending_quarter_beat: 6,
        start_vol: 0.25, end_vol: 1 }, 
      { id: 2, freq: 493.88, // B4
        starting_quarter_beat: 0,
				ending_quarter_beat: 6,
        start_vol: 0.25, end_vol: 1 }, 
      { id: 3, freq: 587.33, // D5
        starting_quarter_beat: 0,
				ending_quarter_beat: 6,
        start_vol: 0.25, end_vol: 1 },
      { id: 9, freq: 659.25, // E5
        starting_quarter_beat: 0,
				ending_quarter_beat: 24,
        start_vol: 0.5, end_vol: 0.5 },
      { id:75, freq: 440.00, // A4
        starting_quarter_beat: 6,
        ending_quarter_beat: 8,
        start_vol: 0.5, end_vol: 0.5 },
      { id: 4, freq: 440.00, // A4
        starting_quarter_beat 12,
				ending_quarter_beat: 24,
        start_vol: 1, end_vol: 0.5 }, 
      { id: 6, freq: 523.25, // C5
        starting_quarter_beat 12,
				ending_quarter_beat: 24,
        start_vol: 1, end_vol: 0.5 }, 
      { id: 80, freq: 493.88, // B4
        starting_quarter_beat 10,
        ending_quarter_beat: 12, 
        start_vol: 0.5, end_vol: 0.5 }
    ]  
  }
}



