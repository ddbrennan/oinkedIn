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

ActiveRecord::Schema.define(version: 20180212182027) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pig_pen_pigs", force: :cascade do |t|
    t.bigint "pig_id"
    t.bigint "pig_pen_id"
    t.integer "x_coord"
    t.integer "y_coord"
    t.integer "direction"
    t.integer "z_index"
    t.string "message", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pig_id"], name: "index_pig_pen_pigs_on_pig_id"
    t.index ["pig_pen_id"], name: "index_pig_pen_pigs_on_pig_pen_id"
  end

  create_table "pig_pens", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pigs", force: :cascade do |t|
    t.string "name"
    t.string "color", default: "#EF8C7B"
    t.boolean "greased", default: false
    t.integer "fitness", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
