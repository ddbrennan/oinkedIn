class PigsSerializer < ActiveModel::Serializer
  attributes :id, :x_coord, :y_coord, :direction, :mediastream
end
