class Note < ApplicationRecord
  validates :channel_id, :freq, presence: true
  validates :starting_quarter_beat, :ending_quarter_beat, presence: true
  validates :start_volume, :end_volume, presence: true

  belongs_to :channel
end
