class PigsController < ApplicationController

    def index
      @pigs = Pig.all
      render json: @pigs
    end

    def create
      @pig = Pig.new(pig_params)
      @pig.id = pig_params[:id]
      if @pig.save
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PigsSerializer.new(@pig)
        ).serializable_hash
        ActionCable.server.broadcast 'pigs_channel', serialized_data
        head :ok
      end
    end

    def update
      @pig = Pig.find(pig_params[:id])
      if @pig.update(pig_params)
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PigsSerializer.new(@pig)
        ).serializable_hash
        ActionCable.server.broadcast 'pigs_channel', serialized_data
        head :ok
      end
    end

    private

      def pig_params
        params.permit(:x_coord, :y_coord, :direction, :id, :mediastream)
      end
end
