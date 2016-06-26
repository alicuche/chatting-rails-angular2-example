class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true
  validates :username, format: { with: /^[a-zA-Z0-9_\.]*$/, multiline: true, message: "only allows letters and numbers" }
  validates :username, uniqueness: true

end
