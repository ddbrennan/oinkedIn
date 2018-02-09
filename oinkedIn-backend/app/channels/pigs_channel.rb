class PigsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "pigs_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
