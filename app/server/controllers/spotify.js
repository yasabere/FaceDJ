import crypto from "crypto";
import Spotify from "spotify-web-api-node";

const SPOTIFY_CONFIG = require("../../config/spotify");
var stateKey = "spotify_auth_state";

const spotifyApi = new Spotify(SPOTIFY_CONFIG);

exports.login = (req, res, next) => {
  console.log("doing shit");
  const state = crypto.randomBytes(16).toString("hex");
  const scopes = ["user-read-private", "user-read-email"];
  // res.cookie("uhhhh", state);
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));

  // Create the authorization URL
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

  // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
  console.log(authorizeURL);
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
