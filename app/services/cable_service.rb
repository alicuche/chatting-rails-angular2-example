class CableService < BaseService

  def self.send_direct_message(message)
    data = {message: message, key: Settings.sub_keys['new_direct_message']}

    ActionCable.server.broadcast "chat_#{message.user_id}_channel", data
    ActionCable.server.broadcast "chat_#{message.receive_id}_channel", data
  end

end