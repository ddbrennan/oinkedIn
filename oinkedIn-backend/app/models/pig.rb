class Pig < ApplicationRecord
  has_many :pig_pen_pigs
  has_many :pig_pens, through: :pig_pen_pigs
end
