const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { audioRouter } = require("./app/routes/audio.route");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/audio", audioRouter)

app.get("/", (req, res)=>{
    res.send("Welcome to Audio Recorder Backend")
})

app.listen(PORT, async ()=>{
    try {
        await connection;
        console.log(`Server is live at Port ${PORT}`);
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
})