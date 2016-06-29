class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{current_user[:id]}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_direct_message(data)
    current_user.messages.create(
      message_type: 0,
      receive_id: data['receive_id'],
      content: data['content']
    )
  end

  def remove_message(data)
    message = current_user.messages.find_by(id: data['message_id'])
    return if message.blank? || message.is_removed

    message.update(is_removed: true)
    CableService.remove_message(message)
  end
end
