const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    password: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
      }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
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

const User = mongoose.model("User", userSchema);
module.exports = User;
