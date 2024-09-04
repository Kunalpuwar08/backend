const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

BlogSchema.pre("save", function (next) {
  this.slug =
    this.title.toLowerCase().split(" ").join("-") +
    "-" +
    this.category.toLowerCase();
  next();
});

module.exports = mongoose.model("Blog", BlogSchema);
