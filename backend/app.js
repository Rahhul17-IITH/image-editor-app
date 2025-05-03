require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const imageRoutes = require("./routes/image");

const app = express();
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/api/images", imageRoutes);

app.listen(4000, () => console.log("Backend running on port 4000"));

