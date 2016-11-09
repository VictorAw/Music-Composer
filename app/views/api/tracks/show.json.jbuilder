json.extract! @track, :id, :title, :bpm, :length
# Channels array
json.set! :channels_attributes do
  json.array! @track.channels do |channel|
    # Channel info
    json.extract! channel, :id, :track_id
      # Notes array
      json.set! :notes_attributes do
        json.array! channel.notes do |note|
         json.extract! note, :id, :channel_id, 
                             :starting_quarter_beat, 
                             :ending_quarter_beat, 
                             :freq, :waveform,
                             :start_volume, :end_volume
      end
    end
  end
end
