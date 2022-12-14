const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/user", require("./routes/user"));
app.use("update/user", require("./routes/updateUser"));
app.use("/project", require("./routes/project"));
app.use("/update/project", require("./routes/updateProject"));
app.use("/update/project", require("./routes/overviewProject"));

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}!`)
);
