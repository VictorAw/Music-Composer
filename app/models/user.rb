class User < ApplicationRecord
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 8, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(un, pw)
    user = User.find_by_username(un)

    return nil if user.nil?
    user.is_password?(pw) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end
end
