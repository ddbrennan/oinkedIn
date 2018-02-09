class ShapesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "shapes_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
