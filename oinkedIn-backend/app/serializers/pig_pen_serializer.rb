class PigPenSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :pig_pen_pigs
  has_many :pigs, through: :pig_pen_pigs
end
