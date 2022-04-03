import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
// connectdb.connect();
import connectDB from "./configs/database.js";
import axios from "axios";
axios.defaults.baseURL="http://localhost:5000/series/";

connectDB();
const __dirname = path.resolve();
// console.log(__dirname);
const app = express();
app.use(express.static(path.join(__dirname)));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname));
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,PUT,OPTIONS"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

//middleware
app.use(json());
app.use(helmet());
app.use(morgan("common"));
import user from "./routes/user.js";
app.use("/user", user);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
