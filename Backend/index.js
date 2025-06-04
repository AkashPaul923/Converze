import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config({});
const port = process.env.PORT || 5000;
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// app.get("/", (req, res) => {
//     res.send("Wellcome to CONVERZE Server!");
// });

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`);
});
