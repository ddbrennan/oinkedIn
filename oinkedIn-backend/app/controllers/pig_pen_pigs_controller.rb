class PigPenPigsController < ApplicationController

    def index
      @pig_pen_pigs = PigPenPig.all
      render json: @pig_pen_pigs
    end

    def create
      @pig_pen_pig = PigPenPig.find_or_initialize_by(pig_id: params[:pig_id], pig_pen_id: params[:pig_pen_id])
      if @pig_pen_pig.valid?
        @pig_pen_pig.save
        @pig_pen_pig.update(pig_pen_pig_params)
        @pig_pen = @pig_pen_pig.pig_pen
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PigPenPigSerializer.new(@pig_pen_pig)
        ).serializable_hash
        PigPenPigsChannel.broadcast_to @pig_pen, serialized_data
        head :ok
      end
    end

    def update
      @pig_pen_pig = PigPenPig.find(params[:id])
      if @pig_pen_pig.update(pig_pen_pig_params)
        @pig_pen = @pig_pen_pig.pig_pen
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PigPenPigSerializer.new(@pig_pen_pig)
        ).serializable_hash
        PigPenPigsChannel.broadcast_to @pig_pen, serialized_data
        head :ok
      end
    end

    def destroy
      @pig_pen_pig = PigPenPig.find(params[:id])
      @pig_pen = @pig_pen_pig.pig_pen
      data = {removed_pig: @pig_pen_pig.id }
      @pig_pen_pig.destroy
      PigPenPigsChannel.broadcast_to(@pig_pen, data)
      head :ok
    end

  private

  def pig_pen_pig_params
    params.require(:pig_pen_pig).permit(:id, :pig_id, :pig_pen_id, :direction, :x_coord, :y_coord, :z_index, :message)
  end
end
