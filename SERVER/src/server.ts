import express from "express";
import userRouter from "./routes/user";
import productRouter from './routes/product';
import otherRoutes from "./routes/otherRoutes";
import cors from "cors"
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;

async function startingServer() {

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(cors());


  app.use("/api", otherRoutes);
  app.use("/user", userRouter);
  app.use("/product", productRouter);



  app.listen(PORT, () => {

    try {
      mongoose.connect("mongodb://127.0.0.1:27017/QuickCart");
      console.log(`Mongodb connected and server running on PORT ${PORT}`);
    }
    catch (error) {
      console.log(error);
    }

  })


}


startingServer();


