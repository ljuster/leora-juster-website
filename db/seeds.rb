# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
  csv_data = CSV.parse(
    open("/Users/leorajuster/work/leora-juster-website/leora-juster-website-api/db/csv_data.csv").read,
      headers: true,
      header_converters: [lambda { |h| h.strip }, :symbol]
    ).map do |row|
      row.to_hash
    end

  csv_data.each do |billboard|
    RankedItems::Billboard.create(billboard)
  end

