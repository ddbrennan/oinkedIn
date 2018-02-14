class CreatePigPenPigs < ActiveRecord::Migration[5.1]
  def change
    create_table :pig_pen_pigs do |t|
      t.belongs_to :pig
      t.belongs_to :pig_pen
      t.integer :x_coord
      t.integer :y_coord
      t.integer :direction
      t.integer :z_index
      t.string :message, default: ""

      t.timestamps
    end
  end
end
