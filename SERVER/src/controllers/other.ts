import { Request, Response } from "express";
import otherServices from "../services/otherServices";


export function renderImage(req : Request , res : Response) { 
otherServices.renderImage(req , res);
}