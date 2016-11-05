class Track < ApplicationRecord
  validates :title, :composer_id, :start_time, :end_time, presence: true

  belongs_to :composer,
    class_name: :User,
    primary_key: :id,
    foreign_key: :composer_id

  has_many :channels, dependent: :destroy

  def length
    return self.end_time - self.start_time
  end

  def find_end_time
    end_time = 0

    # Prevent nested queries
    data = Track.includes(channels: {chords: :notes})

    # Order data
    end_first = data.order("notes.end_time DESC").find_by_id(self.id)
    end_first.channels.each do |channel|
      channel.chords.each do |chord|
        chord_largest_end_time = chord.notes.first.end_time
        if chord_largest_end_time > end_time
          end_time = chrord_largest_end_time
        end
      end
    end

    end_time
  end
end
