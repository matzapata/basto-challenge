import express, { Express } from "express";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes";
import mongoose from "mongoose";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ALLOW_ORIGIN);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use("/api", routes);

if (process.env.DB_URI !== undefined) {
  mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(process.env.port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  });
} else {
  console.error("Missing DB_URI env variable");
  process.exit(1);
}
