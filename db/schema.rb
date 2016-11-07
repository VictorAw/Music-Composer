# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161103163943) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.integer  "track_id",   null: false
    t.float    "volume",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["track_id"], name: "index_channels_on_track_id", using: :btree
  end

  create_table "notes", force: :cascade do |t|
    t.integer  "channel_id",            null: false
    t.integer  "starting_quarter_beat", null: false
    t.integer  "ending_quarter_beat",   null: false
    t.float    "freq",                  null: false
    t.float    "start_volume",          null: false
    t.float    "end_volume",            null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["channel_id"], name: "index_notes_on_channel_id", using: :btree
    t.index ["ending_quarter_beat"], name: "index_notes_on_ending_quarter_beat", using: :btree
    t.index ["starting_quarter_beat"], name: "index_notes_on_starting_quarter_beat", using: :btree
  end

  create_table "tracks", force: :cascade do |t|
    t.integer  "composer_id", null: false
    t.string   "title",       null: false
    t.integer  "bpm",         null: false
    t.integer  "start_time",  null: false
    t.integer  "end_time",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["composer_id"], name: "index_tracks_on_composer_id", using: :btree
    t.index ["end_time"], name: "index_tracks_on_end_time", using: :btree
    t.index ["start_time"], name: "index_tracks_on_start_time", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.text     "description",     null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
