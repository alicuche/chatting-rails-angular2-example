class Message < ApplicationRecord
  belongs_to :user
  belongs_to :receiver, class_name: 'User', foreign_key: :receive_id

  enum message_type: %w(direct channel)

  after_create_commit { MessageBroadcastJob.perform_later(self) }

  scope :users, ->(user1, user2) { where(user_id: [user1.id, user2.id], receive_id: [user1.id, user2.id]) }
  scope :channles, ->(channel1, channel2) { where(user_id: [channel1.id, channel2.id], receive_id: [channel1.id, channel2.id]) }

  def as_json(options = {})
    options[:methods] = [*options[:methods]].push(:short_created_at)
    options[:include] = [*options[:include]].push(:user, :receiver)
    super
  end

  def short_created_at
    self.created_at.strftime("%I:%M %p %d/%m")
  end
end
