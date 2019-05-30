class User < ApplicationRecord
  # Necessary to authenticate.
  has_secure_password

  has_many :votes
  has_many :cats, through: :votes

  # Basic password validation, configure to your liking.
  validates_length_of       :password, maximum: 72, minimum: 8, allow_nil: true, allow_blank: false
  validates_confirmation_of :password, allow_nil: true, allow_blank: false

  before_validation { 
    self.email = self.email.to_s.downcase
  }

  # Make sure email and username are present and unique.
  validates_presence_of     :email
  validates_uniqueness_of   :email

  # This method gives us a simple call to check if a user has permission to modify.
  def can_modify_user?(user_id)
    role == 'admin' || id.to_s == user_id.to_s
  end

  # This method tells us if the user is an admin or not.
  def is_admin?
    admin
  end

  class << self
    def total
      User.all.size
    end

    def total_active
      users = User.all.includes(:votes)
      users.select{ |u| u.votes.size > 0 }.size
    end

    def avg_votes
      total = User.total
      if total > 0
        Vote.all.size / total.to_f
      else
        0
      end
    end
  end
end
