import {Request, Response} from "express";
import {BloggerDAO} from "../repository/BloggerDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";
import {User} from "../model/User";

export class BloggerController {

    findAll(req: Request, res: Response) : ReadonlyArray<User> {

        return new Array;
    }

    findById(id : number) {

        return;
    }
}