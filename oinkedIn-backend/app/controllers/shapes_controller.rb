class ShapesController < ApplicationController

    def index
      @shapes = Shape.all
      render json: @shapes
    end

    def create
      @shape = Shape.new(shape_params)
      @shape.id = shape_params[:id]
      if @shape.save
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          ShapesSerializer.new(@shape)
        ).serializable_hash
        ActionCable.server.broadcast 'shapes_channel', serialized_data
        head :ok
      end
    end

    def update

      @shape = Shape.find(shape_params[:id])
      if @shape.update(x_coord: shape_params[:x_coord], y_coord: shape_params[:y_coord])
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          ShapesSerializer.new(@shape)
        ).serializable_hash
        ActionCable.server.broadcast 'shapes_channel', serialized_data
        head :ok
      end
    end

    private

      def shape_params
        params.permit(:x_coord, :y_coord, :id)
      end
end
