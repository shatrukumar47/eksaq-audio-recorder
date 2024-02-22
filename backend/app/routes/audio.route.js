const express = require("express");
const { postAudio, getAudios, deleteAudio } = require("../controllers/audio.controller");

const audioRouter = express.Router();

//post audio
audioRouter.post("/add", postAudio);

//get all recordings
audioRouter.get("/", getAudios);

//delete audio by id
audioRouter.delete("/delete/:id", deleteAudio)


module.exports = {
    audioRouter
}