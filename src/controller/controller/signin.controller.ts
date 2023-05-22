import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { NextFunction, Response, Request } from "express";

export const check_email = (email: string): RegExpMatchArray | null => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const encrypt_password = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const create_token = async (id: string): Promise<string> => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET ?? "secret", {
    expiresIn: "1y",
  });

  return token;
};

export const decode_token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization === undefined)
    return res.status(403).json({
      msg: "Invalid auth not provide",
    });

  const id = await jwt.decode(req.headers.authorization);
  console.log(id);
  return next();
};
