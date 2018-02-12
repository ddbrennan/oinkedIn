class PigPenPigsController < ApplicationController

    def index
      @pig_pen_pigs = PigPenPig.all
      render json: @pig_pen_pigs
    end

    def create
      @pig_pen_pig = PigPenPig.new(pig_pen_pig_params)
      @pig_pen_pig.id = pig_pen_pig_params[:id]
      if @pig_pen_pig.save
        @pig_pen = @pig_pen_pig.pig_pen
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PigPenPigSerializer.new(@pig_pen_pig)
        ).serializable_hash
        PigPenPigsChannel.broadcast_to @pig_pen, serialized_data
        head :ok
      end
    end

    def update
      @pig_pen_pig = PigPenPig.find(pig_pen_pig_params[:id])
      if @pig_pen_pig.update(pig_pen_pig_params)
        @pig_pen = @pig_pen_pig.pig_pen
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PigPenPigSerializer.new(@pig_pen_pig)
        ).serializable_hash
        PigPenPigsChannel.broadcast_to @pig_pen, serialized_data
        head :ok
      end
    end

  private

  def pig_pen_pig_params
    params.require(:pig_pen_pig).permit(:pig_id, :pig_pen_id, :direction, :x_coord, :y_coord, :z_index)
  end
end
