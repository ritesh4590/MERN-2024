import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();
import AuthRoute from "./routes/AuthRoute.js";
import ContactRoute from "./routes/ContactRoute.js";
import connectDB from "./DB/connectDB.js";
import errorHandler from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 8000;

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", AuthRoute);
app.use("/api/v1", ContactRoute);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
