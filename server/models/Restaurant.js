const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    name: String,
    neighborhood: String,
    photograph: String,
    location: {
        adress: String,
        coordinates: [Number]
    },
    image: String,
    cuisine_type: String,
    timetable: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String,
    },
    reviews: [{
        name: String,
        date: String,
        rating: Number,
        comments: String
    }]

  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        ret.id = doc._id;
        delete ret._id;
      }
    }
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;