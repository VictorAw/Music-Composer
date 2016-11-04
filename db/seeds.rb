# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
User.create({
  id: 1, 
  username: "Guest", 
  email: "guest@email.com", 
  password: "tour_account", 
  description: "Guest account"
})

Track.create({
  id: 1, title: "Untitled", composer_id: 1,
  start_time: 0, end_time: 0
})

Track.first.update({
  channels: []
})

Track.create({
  id: 2, title: "My First Track", composer_id: 1,
  start_time: 0, end_time: 3000
})

Track.second.update({
  channels: [Channel.new({
    id: 1, track_id: 2,
    chords: [Chord.new({
      id: 1, channel_id: 1,
      notes: [Note.new({
        id: 1, chord_id: 1, 
        freq: 392.00,
        start_time: 0, end_time: 1500,
        start_volume: 25, end_volume: 100
      }), Note.new({
        id: 2, chord_id: 1, 
        freq: 493.88,
        start_time: 0, end_time: 1500,
        start_volume: 25, end_volume: 100
      }), Note.new({
        id: 3, chord_id: 1,
        freq: 587.33,
        start_time: 0, end_time: 1500,
        start_volume: 25, end_volume: 100
      })]
    }), Chord.new({
      id: 2, channel_id: 1,
      notes: [Note.new({
        id: 4, chord_id: 2,
        freq: 440.00,
        start_time: 1500, end_time: 3000,
        start_volume: 100, end_volume: 50
      }), Note.new({
        id: 5, chord_id: 2,
        freq: 523.25,
        start_time: 1500, end_time: 3000,
        start_volume: 100, end_volume: 50
      }), Note.new({
        id: 6, chord_id: 2,
        freq: 659.25,
        start_time: 1500, end_time: 3000,
        start_volume: 100, end_volume: 50
      })]
    })]
  }), Channel.new({
    id: 2, track_id: 2,
    chords: [Chord.new({
      id: 3, channel_id: 2,
      notes: [Note.new({
        id: 7, chord_id: 3,
        freq: 164.81,
        start_time: 0, end_time: 3000,
        start_volume: 50, end_volume: 50
      })]
    })]
  }), Channel.create({
    id: 3, track_id: 2,
    chords: [Chord.new({
      id: 4, channel_id: 3,
      notes: [Note.new({
        id: 8, chord_id: 4,
        freq: 440.00,
        start_time: 750, end_time: 950,
        start_volume: 100, end_volume: 100 
      })]
    }), Chord.new({
      id: 5, channel_id: 3,
      notes: [Note.new({
        id: 9, chord_id: 5,
        freq: 493.88,
        start_time: 2250, end_time: 2450,
        start_volume: 100, end_volume: 100
      })]
    })]
  })]
})
