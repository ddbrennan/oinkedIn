class PigSerializer < ActiveModel::Serializer
  attributes :id, :color, :greased, :fitness, :name
  has_many :pig_pen_pigs
  has_many :pig_pens, through: :pig_pen_pigs
end
