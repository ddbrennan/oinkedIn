class PigsController < ApplicationController

    def index
      @pigs = Pig.all
      render json: @pigs
    end

    def create
      @pig = Pig.new(pig_params)
      @pig.id = pig_params[:id]
      if @pig.save
        render json: @pig
      end
    end

    def update
      @pig = Pig.find(pig_params[:id])
      if @pig.update(pig_params)
        render json: @pig
      end
    end

  private

  def pig_params
    params.require(:pig).permit(:id, :color, :greased, :fitness)
  end
end
