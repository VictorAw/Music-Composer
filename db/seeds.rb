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
  bpm: 60, start_time: 0, end_time: 0
})

Track.first.update({
  channels: []
})

Track.create({
  id: 2, title: "My First Track", composer_id: 1,
  bpm: 120, start_time: 0, end_time: 3000
})

Track.second.update({
  channels: [Channel.new({
    id: 1, track_id: 2,
    volume: 1,
    notes: [Note.new({
      id: 1, channel_id: 1, 
      freq: 392.00,
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }), Note.new({
      id: 2, channel_id: 1, 
      freq: 493.88,
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }), Note.new({
      id: 3, channel_id: 1,
      freq: 587.33,
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }), Note.new({
      id: 4, channel_id: 1,
      freq: 440.00,
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }), Note.new({
      id: 5, channel_id: 1,
      freq: 523.25,
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }), Note.new({
      id: 6, channel_id: 1,
      freq: 659.25,
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    })]
  }), Channel.new({
    id: 2, track_id: 2,
    volume: 1,
    notes: [Note.new({
      id: 7, channel_id: 2,
      freq: 164.81,
      starting_quarter_beat: 0,
      ending_quarter_beat: 24,
      start_volume: 0.5, end_volume: 0.5
    })]
  }), Channel.create({
    id: 3, track_id: 2,
    volume: 0.5,
    notes: [Note.new({
      id: 8, channel_id: 3,
      freq: 440.00,
      starting_quarter_beat: 6,
      ending_quarter_beat: 8,
      start_volume: 1, end_volume: 1 
    }), Note.new({
      id: 9, channel_id: 3,
      freq: 493.88,
      starting_quarter_beat: 18, 
      ending_quarter_beat: 20,
      start_volume: 1, end_volume: 1
    })]
  })]
})

Track.create({
  id: 3, title: "My Second Track", composer_id: 1,
  bpm: 120, start_time: 0, end_time: 3000
})

Track.third.update({
  channels: [Channel.new({
    id: 4, track_id: 3,
    volume: 1,
    notes: [Note.new({
      id: 10, channel_id: 4, 
      freq: 784.00,
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }), Note.new({
      id: 11, channel_id: 4, 
      freq: 987.76,
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }), Note.new({
      id: 12, channel_id: 4,
      freq: 1174.66,
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }), Note.new({
      id: 13, channel_id: 4,
      freq: 880.00,
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }), Note.new({
      id: 14, channel_id: 4,
      freq: 1046.5,
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }), Note.new({
      id: 15, channel_id: 4,
      freq: 1318.5,
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    })]
  }), Channel.new({
    id: 5, track_id: 3,
    volume: 1,
    notes: [Note.new({
      id: 16, channel_id: 5,
      freq: 329.62,
      starting_quarter_beat: 0,
      ending_quarter_beat: 24,
      start_volume: 0.5, end_volume: 0.5
    })]
  }), Channel.create({
    id: 6, track_id: 3,
    volume: 0.5,
    notes: [Note.new({
      id: 17, channel_id: 6,
      freq: 880.00,
      starting_quarter_beat: 6,
      ending_quarter_beat: 8,
      start_volume: 1, end_volume: 1 
    }), Note.new({
      id: 18, channel_id: 6,
      freq: 987.76,
      starting_quarter_beat: 18, 
      ending_quarter_beat: 20,
      start_volume: 1, end_volume: 1
    })]
  })]
})
