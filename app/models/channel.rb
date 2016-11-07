class Channel < ApplicationRecord
  validates :track_id, presence: true
  validates :volume, presence: true

  belongs_to :track
  has_many :notes, dependent: :destroy
end
