class PigPenPigsChannel < ApplicationCable::Channel
  def subscribed
    pig_pen = PigPen.find(params[:pig_pen])
    stream_for pig_pen
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
