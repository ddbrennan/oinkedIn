# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 5 pigs

david = Pig.create(name: "david", greased: false, color: "blue", fitness: 10)
matt = Pig.create(name: "matt", greased: false, color: "green", fitness: 1)
sebastian = Pig.create(name: "sebastian", greased: true, color: "red", fitness: 8)
kelly = Pig.create(name: "kelly", greased: true, color: "grey", fitness: 7)

# 3 pig pens

pen1 = PigPen.create(name: "hog lounge", description: "loungey")
pen2 = PigPen.create(name: "swine time", description: "it's time!")
pen3 = PigPen.create(name: "wild hogs fans", description: "love late career martin lawrence")
