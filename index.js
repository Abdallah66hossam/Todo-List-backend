const express = require("express");
const connectDB = require("./middleware/dbConnect");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
connectDB();
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/todos", todoRouter);

app.listen(PORT, console.log("listening on port" + PORT));
