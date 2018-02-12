class PigPensController < ApplicationController
  def index
      pig_pens = PigPen.all
      render json: pig_pens
    end

    def create
      pig_pen = PigPen.new(pig_pen_params)
      if pig_pen.save
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PigPenSerializer.new(pig_pen)
        ).serializable_hash
        ActionCable.server.broadcast 'pig_pens_channel', serialized_data
        head :ok
      end
    end

    def show
      pig_pen = PigPen.find(params[:id])
      # serialized_data = ActiveModelSerializers::Adapter::Json.new(
      #   PigPenSerializer.new(pig_pen)
      # ).serializable_hash
      # PigPenPigsChannel.broadcast_to pig_pen, serialized_data
      # head :ok
      render json: pig_pen
    end

    private

    def pig_pen_params
      params.require(:pig_pen).permit(:name, :description, :id)
  end
end
