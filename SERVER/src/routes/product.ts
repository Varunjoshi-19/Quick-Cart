import express  from "express";
import multer, { memoryStorage } from "multer";
import { addNewProduct } from "../controllers/product";
const router = express.Router();
const upload = multer({storage : memoryStorage()});



router.post("/add-newProduct" , upload.single("file") , addNewProduct);



export default router;