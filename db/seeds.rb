# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
User.create({
  username: "Guest", 
  email: "guest@email.com", 
  password: "tour_account", 
  description: "Guest account"
})

Track.create({
  title: "Untitled", composer_id: 1,
  bpm: 60, start_time: 0, end_time: 0,
  channels_attributes: []
})

Track.create({
  title: "My First Track", composer_id: 1,
  bpm: 120, start_time: 0, end_time: 3000,
  channels_attributes: [{
    volume: 1,
    notes_attributes: [{
      freq: 392.00, waveform: "sine",
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }, {
      freq: 493.88, waveform: "sine",
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }, {
      freq: 587.33, waveform: "sine",
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }, {
      freq: 440.00, waveform: "sine",
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }, {
      freq: 523.25, waveform: "sine",
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }, {
      freq: 659.25, waveform: "sine",
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }]
  }, {
    volume: 1,
    notes_attributes: [{
      freq: 164.81, waveform: "sine",
      starting_quarter_beat: 0,
      ending_quarter_beat: 24,
      start_volume: 0.5, end_volume: 0.5
    }]
  }, {
    volume: 0.5,
    notes_attributes: [{
      freq: 440.00, waveform: "sine",
      starting_quarter_beat: 6,
      ending_quarter_beat: 8,
      start_volume: 1, end_volume: 1 
    }, {
      freq: 493.88, waveform: "sine",
      starting_quarter_beat: 18, 
      ending_quarter_beat: 20,
      start_volume: 1, end_volume: 1
    }]
  }]
})

Track.create({
  title: "My Second Track", composer_id: 1,
  bpm: 120, start_time: 0, end_time: 3000,
  channels_attributes: [{
    volume: 1,
    notes_attributes: [{
      freq: 784.00, waveform: "square",
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }, {
      freq: 987.76, waveform: "square",
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }, {
      freq: 1174.66, waveform: "square",
      starting_quarter_beat: 0,
      ending_quarter_beat: 12,
      start_volume: 0.25, end_volume: 1
    }, {
      freq: 880.00, waveform: "square",
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }, {
      freq: 1046.5, waveform: "square",
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }, {
      freq: 1318.5, waveform: "square",
      starting_quarter_beat: 12,
      ending_quarter_beat: 24,
      start_volume: 1, end_volume: 0.5
    }]
  }, {
    volume: 1,
    notes_attributes: [{
      freq: 329.62, waveform: "square",
      starting_quarter_beat: 0,
      ending_quarter_beat: 24,
      start_volume: 0.5, end_volume: 0.5
    }]
  }, {
    volume: 0.5,
    notes_attributes: [{
      freq: 880.00, waveform: "square",
      starting_quarter_beat: 6,
      ending_quarter_beat: 8,
      start_volume: 1, end_volume: 1 
    }, {
      freq: 987.76, waveform: "square",
      starting_quarter_beat: 18, 
      ending_quarter_beat: 20,
      start_volume: 1, end_volume: 1
    }]
  }]
})
