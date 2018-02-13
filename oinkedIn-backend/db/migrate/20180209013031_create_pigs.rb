class CreatePigs < ActiveRecord::Migration[5.1]
  def change
    create_table :pigs do |t|
      t.string :name
      t.string :color
      t.boolean :greased
      t.integer :fitness

      t.timestamps
    end
  end
end
