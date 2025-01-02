const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { readdirSync } = require("fs");

const app = express();
app.use(cors());
const useRoutes = require("./routes/user");

app.use("/user", useRoutes);

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
    .connect(process.env.DATABASE_URL, {
    })
    .then(() => console.log("database connected successfully"))
    .catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});