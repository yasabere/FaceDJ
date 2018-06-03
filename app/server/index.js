const express = require("express");
const path = require("path");

const config = require("../config/main");
const router = require("./router");

const app = express();
const PORT = config.port;

router(app);

app.listen(PORT, error => {
  if (error) {
    return console.log("something bad happened", error);
  }

  console.log("listening on " + PORT + "...");
});
