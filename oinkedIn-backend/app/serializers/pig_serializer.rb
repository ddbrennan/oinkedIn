class PigSerializer < ActiveModel::Serializer
  attributes :id, :color, :greased, :fitness
  has_many :pig_pen_pigs
  has_many :pigs, through: :pig_pen_pigs
end
