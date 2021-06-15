"use strict";

const { validateAPIKey, validateRateLimit, apiStatus} = require("./utils")

const express = require("express");

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

// App
const app = express();

// Request tracker
const apiRate = {}

// GET /limit
app.get("/limit", (req, res) => {
  const apiKey = req.get("X-API-KEY")

  // validate api key, reject request if invalid
  const isKeyValid = validateAPIKey(apiKey)
  if (!isKeyValid) {
    return res.status(400).send("API key is invalid!")
  }

  // ensure this api key is within rate limits
  const { isRateAcceptable, apiStatus } = validateRateLimit(apiKey)

  if (!isRateAcceptable) {
    return res.status(400).send("Too many requests! Please wait a second and try your request again.")
  }

  // return api usuage status
  return res.send(apiStatus);
});

app.get("/trace", (req, res) => {
  const apiKey = req.get("X-API-KEY")
  
  // validate api key, reject request if invalid
  const isKeyValid = validateAPIKey(apiKey)
  if (!isKeyValid) {
    return res.status(400).send("API key is invalid!")
  }

  // return api usuage status
  return res.send(apiStatus());
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
