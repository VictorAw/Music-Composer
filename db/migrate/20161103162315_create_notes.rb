class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.integer :chord_id, null: false
      t.integer :start_time, null: false
      t.integer :end_time, null: false
      t.decimal :freq, precision: 6, scale: 2, null: false
      t.integer :start_volume, null: false
      t.integer :end_volume, null: false

      t.timestamps
    end

    add_index :notes, :chord_id
  end
end
