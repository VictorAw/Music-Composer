json.extract! @track, :id, :title, :length
# Channels array
json.set! :channels do
  json.array! @track.channels do |channel|
    # Channel info
    json.extract! channel, :id, :track_id
      # Notes array
      json.set! :notes do
        json.array! channel.notes do |note|
         json.extract! note, :id, :channel_id, 
                             :starting_quarter_beat, 
                             :ending_quarter_beat, 
                             :freq, :start_volume, :end_volume
      end
    end
  end
end
