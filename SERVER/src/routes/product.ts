import express  from "express";
import Product from "../controllers/product";
import multer, { memoryStorage } from "multer";
const router = express.Router();
const upload = multer({storage : memoryStorage()});



router.post("/add-newProduct" , upload.single("file") , Product.handleAddNewProduct);



export default router;