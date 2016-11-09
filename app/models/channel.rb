class Channel < ApplicationRecord
  validates :track, presence: true
  validates :volume, presence: true

  belongs_to :track
  has_many :notes, dependent: :destroy, inverse_of: :channel
  accepts_nested_attributes_for :notes, allow_destroy: true
end
