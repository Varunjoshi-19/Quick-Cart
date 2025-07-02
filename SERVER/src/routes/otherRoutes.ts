import express  from "express";
import otherServices from "../services/otherServices";
import { renderImage, renderProduct } from "../controllers/other";
const router = express.Router();

router.get("/render/img/:userId" , renderImage);
router.get("/render/productImage/:productId" , renderProduct);





export default router;