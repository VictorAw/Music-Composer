class Chord < ApplicationRecord
  validates :channel_id, presence: true

  belongs_to :channel
  has_many :notes, dependent: :destroy
end
