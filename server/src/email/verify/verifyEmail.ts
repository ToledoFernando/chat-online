import { IEmailVerify } from "../EmailTypes";
import { CLIENT_URL } from "../../config/config";
import fs from "fs";
import path from "path";

const changeName = (name: string): string => {
  const nombre = name[0].toUpperCase() + name.slice(1);
  return nombre;
};

export default (data: IEmailVerify): string => {
  const contentHTML = fs
    .readFileSync(path.join(__dirname, "verify.html"), "utf-8")
    .replace("###LINK###", CLIENT_URL + "verify/" + data.code)
    .replace("###FIRST###", changeName(data.userFistname))
    .replace("###LAST###", changeName(data.userLastName));
  return contentHTML;
};
