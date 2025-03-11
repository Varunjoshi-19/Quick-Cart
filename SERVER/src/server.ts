import express from "express";
import {expressMiddleware} from "@apollo/server/express4";
import createGraphQLSever from "./graphql/graphql-server";
import userRouter from "./routes/user";
import productRouter from './routes/product';
import cors from "cors"
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;

async function startingServer() {

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors());

app.get("/" ,  (req ,res) =>  { 
    res.send("server working");
});

app.use("/user" , userRouter);
app.use("/product" , productRouter);
app.use("/graphql" , expressMiddleware(await createGraphQLSever()) as any);



app.listen(PORT ,  () => {

try { 
   mongoose.connect("mongodb://127.0.0.1:27017/QuickCart");
    console.log(`Mongodb connected and server running on PORT ${PORT}`);    
}
catch(error) {
  console.log(error);    
}

})


}


startingServer();


