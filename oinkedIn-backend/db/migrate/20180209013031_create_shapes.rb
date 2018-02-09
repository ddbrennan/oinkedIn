class CreateShapes < ActiveRecord::Migration[5.1]
  def change
    create_table :shapes do |t|
      t.integer :x_coord
      t.integer :y_coord
      t.integer :direction
      t.binary :mediastream, default: ""

      t.timestamps
    end
  end
end
