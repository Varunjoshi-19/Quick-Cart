import express  from "express";
import multer, { memoryStorage } from "multer";
import { addNewProduct, getAllProducts } from "../controllers/product";
const router = express.Router();
const upload = multer({storage : memoryStorage()});



router.post("/add-newProduct" , upload.single("file") , addNewProduct);

router.get("/get-products" , getAllProducts);


export default router;