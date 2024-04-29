import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db";

const startServer = async () => {
  await connectDB();
  const port = 3000;

  console.log(`Attempting to start server on port: ${port}`);

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

startServer();
