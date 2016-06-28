class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    if message.direct?
      CableService.send_direct_message(message)
    else
      # channel group
    end

  end
end
