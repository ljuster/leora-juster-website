class BillboardsController < ApplicationController

  def index
    @billboards = RankedItems::Billboard.order('score ASC')
    @billboard = RankedItems::Billboard.new
  end

  def create
    @billboard = RankedItems::Billboard.new(billboard_params)
    if @billboard.save
      render json: @billboard
    else
      render json: @billboard.errors, status: :unprocessable_entity
    end
  end

  private
  def billboard_params
    params.require(:billboard).permit(:score)
  end
end
