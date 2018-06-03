import express from "express";
import Spotify from "spotify-web-api-node";

const SPOTIFY_CONFIG = require("../config/spotify");

const router = express.Router();

module.exports = app => {
  router.use(
    express.static(path.resolve(__dirname, "..", "build"), { maxAge: "0d" })
  );

  // router.use("^/$", serverRenderer);

  // router.use("*", serverRenderer);

  app.use(router);
  console.log(app);
};
