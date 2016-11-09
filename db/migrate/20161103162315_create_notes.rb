class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.integer :channel_id, null: false
      t.integer :starting_quarter_beat, null: false
      t.integer :ending_quarter_beat, null: false
      t.float   :freq, null: false
      t.string  :waveform, null: false
      t.float   :start_volume, null: false
      t.float   :end_volume, null: false

      t.timestamps
    end

    add_index :notes, :channel_id
    add_index :notes, :starting_quarter_beat
    add_index :notes, :ending_quarter_beat
  end
end
