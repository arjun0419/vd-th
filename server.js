"use strict";

const express = require("express");

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/limit", (req, res) => {
  res.send("Thanks for calling limit!");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
