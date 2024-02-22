const mongoose = require("mongoose");

const audioSchema = mongoose.Schema(
  {
    url: {type: String, required: true},
    date: {type: Date , default: Date.now }
  },
  {
    versionKey: false,
  }
);

const AudioModel = mongoose.model("recording", audioSchema);

module.exports = {
    AudioModel
}