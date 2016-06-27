class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :messages

  validates :username, presence: true
  validates :username, format: { with: /^[a-zA-Z0-9_\.]*$/, multiline: true, message: "only allows letters and numbers" }
  validates :username, uniqueness: true

  before_create :set_avatar_default

  enum status: %w(offline online busy)

  def as_json(options = {})
    options[:methods] = [*options[:methods]].push(:avatar_path)
    super
  end

  def set_avatar_default
    self.avatar = "male#{rand(6)}.png"
  end

  def avatar_path
    "/images/avatar/#{self.avatar}"
  end

  def friends
    User.find(Friend.where(user: self).pluck(:to_user_id))
  end

  def friend?(user)
    Friend.exists?(user: self, friend_to: user)
  end
end
