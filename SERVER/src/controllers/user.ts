import { Request, Response } from "express";
import userServices from "../services/user-services";


export async function handleUserLogin(req: Request, res: Response) {
  userServices.handleLogin(req, res);
}

export async function handleSignUp(req: Request, res: Response) {
  userServices.handleSignUp(req, res);
}

export async function handleUpdateUserDetails(req: Request, res: Response) {
  userServices.handleUpdateUserProfile(req, res);
}