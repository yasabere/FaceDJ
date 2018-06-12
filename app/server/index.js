import express from "express";
import path from "path";
import morgan from "morgan";

const config = require("../config/main");
const router = require("./router");

const app = express();
const PORT = config.port;

router(app);

app.use(morgan("dev"));

app.listen(PORT, error => {
  if (error) {
    return console.log("something bad happened", error);
  }

  console.log("listening on " + PORT + "...");
});
