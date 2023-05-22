import { Request, Response } from "express";
import { IUser } from "../../../interface/user.interface";
import {
  check_email,
  create_token,
  encrypt_password,
} from "../../../controller/controller/signin.controller";

export async function POST(req: Request, res: Response) {
  const user = req.body as IUser;
  if (user === undefined)
    return res.status(400).json({ msg: "All fields are necesary", data: [] });
  if (check_email(user.email) === null)
    return res.status(400).json({ msg: "Email is no valid", data: [] });

  const enc_pwd = await encrypt_password(user.password);
  user.id = "hola";
  user.password = enc_pwd;

  const token = await create_token(user.id);

  return res.json({ data: user, token: token });
}
