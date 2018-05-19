class BillboardsController < ApplicationController

  def index
    csv_data = CSV.parse(
      open("/Users/leorajuster/work/leora-juster-website/leora-juster-website-api/db/csv_data.csv").read,
      headers: true,
      header_converters: [lambda { |h| h.strip }, :symbol]
    ).map do |row|
      row.to_hash
    end

    csv_data.each do |billboard|
      Billboard.create!(billboard)
    end

    @billboards = Billboard.order('score ASC')
    @billboard = Billboard.new
  end

  def create
    @billboard = Billboard.new(billboard_params)
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
