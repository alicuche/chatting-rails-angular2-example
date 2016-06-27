class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params['direct_id']}_channel"
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
end
