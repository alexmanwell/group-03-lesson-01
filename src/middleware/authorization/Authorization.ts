import {Request, Response, NextFunction} from "express";
import {Buffer} from "buffer";

const AUTH_TYPE = 'Basic';
const LOGIN = "admin";
const PASSWORD = "qwerty"
export class Authorization {

    check (req: Request, res: Response, next: NextFunction) {
        const header = req.headers.authorization || "";

        const authType = header.split(/\s+/).shift();
        if (authType !== AUTH_TYPE) {
            res.sendStatus(401);
            return;
        }

        const b64auth = (header || "").split(" ")[1] || "";
        const [login, password] = Buffer.from(b64auth, "base64").toString().split(":");
        if (LOGIN !== login || PASSWORD !== password) {
            console.warn(`failed authorization, wrong login = ${login} or password`);
            res.set("WWW-Authenticate", "Basic realm=\"401\"")
                .status(401)
                .send();
            return;
        }

        next();
    }
}