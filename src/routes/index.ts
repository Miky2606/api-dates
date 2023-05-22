import fs from "fs";
import { Router } from "express";
import { FunctionsGet } from "../interface/routes.interface";
import { decode_token } from "../controller/controller/signin.controller";

const PATH = __dirname;
const router = Router();

/**
 *
 *
 * @returns
 */
const cleanName = (name: string): string | undefined => {
  return name.split(".").shift();
};

const function_get = (funct: FunctionsGet, route: string) => {
  if (funct.POST !== undefined) {
    router.post(`${route}`, funct.POST);
  }
  if (funct.GET !== undefined) {
    router.get(`${route}`, funct.GET);
  }
  if (funct.PUT !== undefined) {
    router.put(`${route}`, funct.PUT);
  }
  if (funct.DELETE !== undefined) {
    router.delete(`${route}`, funct.DELETE);
  }
};

const get_url = async (path: string, route: string) => {
  const url = fs.readdirSync(path);

  return url.map((e) => {
    if (fs.lstatSync(path + "/" + e).isDirectory()) {
      if (e.includes("[") && e.includes("]")) {
        const slice = path.split("/");
        const sub_route =
          slice[slice.length - 1] === undefined
            ? ""
            : slice[slice.length - 1] + "/";

        get_url(
          `${path}/${e}`,
          `${sub_route}:${e.split("[")[1].split("]")[0]}`
        );
      } else {
        get_url(`${path}/${e}`, `${path}/${e}`.replace(PATH, ""));
      }
    } else {
      if (e === "route.ts") {
        import(`${path}/${cleanName(e)}`).then((module) => {
          function_get(module as FunctionsGet, route);
        });
      }
    }
  });
};

get_url(PATH, "/");

export default router;
