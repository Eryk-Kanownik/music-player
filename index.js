const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

const songs = [];

app.use(cors());

app.use("/songs", express.static(path.join(__dirname, "public/songs")));

app.get("/get-song-list", (req, res) => {
  fs.readdir("public/songs", function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(function (file) {
      let isInArray = songs.map((e) => e.file).indexOf(file);
      console.log(file);
      if (isInArray < 0) {
        if (file.includes(".mp3"))
          songs.push({
            file,
            path: req.protocol + "://" + req.get("host") + "/songs/" + file,
          });
      }
    });
  });
  res.status(200).json(songs);
});

app.listen(2000, () => console.log("http://localhost:2000"));
