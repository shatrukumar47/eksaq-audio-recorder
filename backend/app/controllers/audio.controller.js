const { AudioModel } = require("../models/audio.model");

//Post Audio
const postAudio = async (req, res) => {
  const { url } = req.body;
  try {
    const exisitingAudio = await AudioModel.findOne({ url: url });
    if (exisitingAudio) {
      return res.status(400).send({ message: "Audio already saved", action: false });
    }
    const audio = new AudioModel({ url });
    await audio.save();
    return res.status(200).send({ message: "Audio added successfully", action: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, action: false });
  }
};

//Get Audios
const getAudios = async (req, res) => {
  try {
    const audios = await AudioModel.find();
    return res.status(200).json(audios);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

//Delete Audio
const deleteAudio = async (req, res) => {
  const { id } = req.params;
  try {
    const audio = await AudioModel.findOne({ _id: id });
    if (!audio) {
      return res
        .status(400)
        .send({ message: "Audio Not Found!", action: false });
    }

    await AudioModel.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .send({ message: "Audio deleted successfully", action: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, action: false });
  }
};

module.exports = {
  postAudio,
  getAudios,
  deleteAudio,
};
