class CreateTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks do |t|
      t.integer :composer_id, null: false
      t.string :title, null: false
      t.integer :bpm, null: false
      t.integer :start_time, null: false
      t.integer :end_time, null: false

      t.timestamps
    end

    add_index :tracks, :composer_id
    add_index :tracks, :start_time
    add_index :tracks, :end_time
  end
end
