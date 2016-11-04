class Track < ApplicationRecord
  validates :title, :composer_id, :start_time, :end_time, presence: true

  belongs_to :composer,
    class_name: :User,
    primary_key: :id,
    foreign_key: :composer_id

  has_many :channels, dependent: :destroy

  def duration
    return this.end_time - this.start_time
  end

  def find_start_time
    start_time = 0
    end_time = 0
    channels.each do |channel|

    end
  end
end
