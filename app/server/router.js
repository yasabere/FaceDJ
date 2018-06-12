import express from "express";
import path from "path";
import spotify from "./controllers/spotify";

const router = express.Router();

const apiRoutes = express.Router(),
  authRoutes = express.Router();

module.exports = app => {
  router.get("/login", spotify.login);
  router.get("/callback", spotify.callback);

  app.use(router);

  //app.use(express.static(path.resolve(__dirname, "..", "build")));

  // router.use(
  //   express.static(path.resolve(__dirname, "..", "build"), { maxAge: "0d" })
  // );
  // router.use("^/$", serverRenderer);

  // router.use("*", serverRenderer);
};
