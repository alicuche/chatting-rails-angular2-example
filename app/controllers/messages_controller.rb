class MessagesController < ApplicationController

  def create
    success(current_user.messages.create(message_params))
  end

  private
  def message_params
    params.require(:message).permit(:message_type, :receive_id, :content)
  end

end
