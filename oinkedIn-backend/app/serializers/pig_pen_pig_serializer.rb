class PigPenPigSerializer < ActiveModel::Serializer
  attributes :id, :pig_id, :pig_pen_id, :direction, :x_coord, :y_coord, :z_index, :message
  belongs_to :pig
  belongs_to :pig_pen
end
