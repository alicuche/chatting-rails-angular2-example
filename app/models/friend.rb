class Friend < ApplicationRecord
  belongs_to :user
  belongs_to :friend_to, class_name: 'User', foreign_key: 'to_user_id'
end
