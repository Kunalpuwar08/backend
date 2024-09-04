const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/blog", blogRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
