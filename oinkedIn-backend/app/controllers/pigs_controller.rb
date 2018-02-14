class PigsController < ApplicationController

    def index
      @pigs = Pig.all
      render json: @pigs
    end

    def create
      @pig = Pig.find_or_create_by(name: pig_params[:name])
      render json: @pig
    end

    def update
      @pig = Pig.find(params[:id])
      if @pig.update(pig_params)
        render json: @pig
      end
    end

  private

  def pig_params
    params.require(:pig).permit(:id, :name, :color, :greased, :fitness)
  end
end
