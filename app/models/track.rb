class Track < ApplicationRecord
  validates :title, :composer_id, :bpm, :start_time, :end_time, presence: true

  belongs_to :composer,
    class_name: :User,
    primary_key: :id,
    foreign_key: :composer_id

  has_many :channels, dependent: :destroy, inverse_of: :track
  accepts_nested_attributes_for :channels, allow_destroy: true

  def qbeats_to_ms(qbeat_count)
    Integer(((qbeat_count / 4.0) * (60.0 / bpm)) * 1000)
  end

  def ms_to_qbeats(ms)
    Integer(((ms / 1000.0) * (bpm / 60.0)) * 4)
  end

  def length
    return self.end_time - self.start_time
  end

  def find_end_time
    end_qbeat = 0

    # Prevent nested queries
    data = Track.includes(channels: :notes)

    # Order data
    end_first = data.order("notes.ending_quarter_beat DESC").find_by_id(self.id)
    end_first.channels.each do |channel|
      largest_end_qbeat = channel.notes.first.ending_quarter_beat
      if largest_end_qbeat > end_qbeat
        end_qbeat = largest_end_qbeat
      end
    end

    qbeats_to_ms(end_qbeat)
  end
end
