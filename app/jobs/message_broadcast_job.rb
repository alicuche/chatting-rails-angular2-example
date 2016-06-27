class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    if message.direct?
    ActionCable.server.broadcast "chat_#{message.user_id}_#{message.receive_id}_channel", message: message
    ActionCable.server.broadcast "chat_#{message.receive_id}_#{message.user_id}_channel", message: message
    else
      # channel group
    end

  end
end
