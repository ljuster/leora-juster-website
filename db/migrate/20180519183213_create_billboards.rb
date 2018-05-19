class CreateBillboards < ActiveRecord::Migration[5.0]
  def change
    create_table :billboards do |t|
      t.string :name
      t.string :image_url
      t.integer :score

      t.timestamps
    end
  end
end
