class CreatePigs < ActiveRecord::Migration[5.1]
  def change
    create_table :pigs do |t|
      t.string :name
      t.string :color, default: "#EF8C7B"
      t.boolean :greased, default: false
      t.integer :fitness, default: 1

      t.timestamps
    end
  end
end
