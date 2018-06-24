import express from "express";
import path from "path";
import spotify from "./controllers/spotify";
import serverRenderer from "./middleware/renderer";

const router = express.Router();

const apiRoutes = express.Router(),
  authRoutes = express.Router();

module.exports = app => {
  router.get("/login", spotify.login);
  router.get("/callback", spotify.callback);
  router.use("^/$", serverRenderer);

  router.use(
    express.static(path.resolve(__dirname, "..", "build"), { maxAge: "0d" })
  );

  //router.use("*", serverRenderer);

  app.use(router);
};
