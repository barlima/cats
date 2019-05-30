class Cat < ApplicationRecord
  FLICKR_URL = "https://www.flickr.com/photos".freeze

  validates_presence_of     :farm_id
  validates_presence_of     :server_id
  validates_presence_of     :secret
  validates_presence_of     :flickr_id
  validates_presence_of     :flickr_owner
  validates_uniqueness_of   :flickr_id

  has_many :votes
  has_many :users, through: :votes

  def url
    "https://farm#{farm_id}.staticflickr.com/#{server_id}/#{flickr_id}_#{secret}.jpg"
  end

  class << self
    def total
      Cat.all.size
    end

    def avg_votes
      total = Cat.total
      if total > 0
        Vote.all.size / total.to_f
      else
        0
      end
    end
  end
end
