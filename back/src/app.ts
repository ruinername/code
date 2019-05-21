import express from "express";
import bodyParser from "body-parser";
import path from "path";
import expressValidator from "express-validator";

import cors from "cors";
import fetch from "cross-fetch";
// Load environment variables from .env file, where API keys and passwords are configured

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/getInfo/:ip", cors(), async function(req, res, next) {
  const ip: string = (/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(req.params.ip)) ? req.params.ip : (req.headers["x-forwarded-for"] || req.connection.remoteAddress);
  const resp = await fetch(`https://freegeoip.app/json/${ip}`, {method: "GET"});
  const data = await resp.json();
  return res.status(200).json(data);
});

export default app;
