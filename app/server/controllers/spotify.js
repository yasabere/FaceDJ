import crypto from "crypto";
import Spotify from "spotify-web-api-node";

const SPOTIFY_CONFIG = require("../../config/spotify");
var stateKey = "spotify_auth_state";

const spotifyApi = new Spotify(SPOTIFY_CONFIG);

exports.login = (req, res, next) => {
  const state = crypto.randomBytes(16).toString("hex");
  const scopes = ["user-read-private", "user-read-email"];
  // res.cookie("uhhhh", state);
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));

  // Create the authorization URL
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
};

exports.callback = (req, res, next) => {
  const { code } = req.query;
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const { expires_in, access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      res.redirect(`/#/user/${access_token}/${refresh_token}`);
    })
    .catch(err => {
      res.redirect("/#/error/invalid token");
    });
};
