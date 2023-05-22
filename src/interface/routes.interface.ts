import { Application, Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface FunctionsGet {
  POST: Application;
  GET: Application;
  PUT: Application;
  DELETE: Application;
}

export interface IRequest extends Request {
  id: string | JwtPayload | null;
}
