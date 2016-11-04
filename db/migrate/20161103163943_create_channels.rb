class CreateChannels < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.integer :track_id, null: false 

      t.timestamps
    end

    add_index :channels, :track_id
  end
end
