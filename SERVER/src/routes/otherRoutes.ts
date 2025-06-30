import express  from "express";
import otherServices from "../services/otherServices";
import { renderImage } from "../controllers/other";
const router = express.Router();

router.get("/render/img/:userId" , renderImage);




export default router;