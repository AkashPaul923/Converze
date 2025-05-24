import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config({});
const port = process.env.PORT || 5000;
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";

// middleware
app.use(express.json());

// routes
app.use("/api/v1/user", userRoute);



app.get("/", (req, res) => {
    res.send("Wellcome to CONVERZE Server!");
});

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`);
});
