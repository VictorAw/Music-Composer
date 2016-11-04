json.extract! @track, :id, :title, :start_time, :end_time
# Channels array
json.set! :channels do
  json.array! @track.channels do |channel|
    # Channel info
    json.extract! channel, :id, :track_id
     # Chords array
    json.set! :chords do
      json.array! channel.chords do |chord|
        # Chord info
        json.extract! chord, :id, :channel_id
        # Notes array
        json.set! :notes do
          json.array! chord.notes do |note|
           json.extract! note, :id, :chord_id, 
                               :start_time, :end_time, 
                               :freq, :start_volume, :end_volume
          end
        end
      end
    end
  end
end
