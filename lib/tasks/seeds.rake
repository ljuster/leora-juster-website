# frozen_string_literal: true

namespace :billboards do
  namespace :seeds do
    desc 'Manually seed billboard data'
    task :populate_billboards, [:environment] do
      puts 'Seeding Billboard Data'

      csv_data = CSV.parse(
        open("/Users/leorajuster/work/leora-juster-website/leora-juster-website-api/db/csv_data.csv").read,
        headers: true,
        header_converters: [lambda { |h| h.strip }, :symbol]
      ).map do |row|
        row.to_hash
      end

      csv_data.each do |billboard|
        Billboard.new(billboard)
      end

    end
  end
end
