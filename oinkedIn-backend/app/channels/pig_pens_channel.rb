class PigPensChannel < ApplicationCable::Channel
  def subscribed
    stream_from "pig_pens_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
