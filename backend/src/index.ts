import { connectDB, PORT } from "./config";
import { config } from "dotenv";
import app from "./app";
config();

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

startServer();
