class Channel < ApplicationRecord
  validates :track_id, presence: true

  belongs_to :track
  has_many :chords, dependent: :destroy
end
