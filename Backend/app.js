const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173",  // frontend ka origin
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

// ✅ Static folder for images (Backend/uploads folder)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Test route
app.get("/test", (req, res) => res.send("Hello world!"));

// ✅ Load routes
const user = require("./controller/user");
app.use("/api/v2/user", user);

// ✅ Error handler
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
