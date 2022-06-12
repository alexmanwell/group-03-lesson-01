import {Request, Response, Router} from "express";
import {BloggerDAO} from "../repository/BloggerDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";

export const router = Router();

router.get('/', (req: Request, res: Response) => {

});

router.get('/:id', (req: Request, res: Response) => {

});