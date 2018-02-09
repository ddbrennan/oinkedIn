class CreatePigs < ActiveRecord::Migration[5.1]
  def change
    create_table :pigs do |t|
      t.integer :x_coord
      t.integer :y_coord
      t.integer :direction
      t.binary :mediastream, default: ""

      t.timestamps
    end
  end
end
