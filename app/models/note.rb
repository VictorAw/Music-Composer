class Note < ApplicationRecord
  validates :chord_id, :freq, presence: true
  validates :start_time, :end_time, presence: true
  validates :start_volume, :end_volume, presence: true

  belongs_to :chord
end
