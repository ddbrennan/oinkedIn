class CreatePigPens < ActiveRecord::Migration[5.1]
  def change
    create_table :pig_pens do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
