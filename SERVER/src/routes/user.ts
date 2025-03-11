import express  from "express";
import { handleUserLogin } from "../controllers/user";
const router = express.Router();


router.post("/login" , handleUserLogin);



export default router;