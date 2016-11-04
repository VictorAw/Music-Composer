class CreateChords < ActiveRecord::Migration[5.0]
  def change
    create_table :chords do |t|
      t.integer :channel_id, null: false

      t.timestamps
    end

    add_index :chords, :channel_id
  end
end
