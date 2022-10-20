import mongoose from "mongoose";
import app from "./app";
import "dotenv/config";

if (process.env.DB_URI !== undefined) {
  mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(process.env.port, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  });
} else {
  console.error("Missing DB_URI env variable");
  process.exit(1);
}
