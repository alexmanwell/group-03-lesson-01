import express, {Request, Response} from "express";

const app = express();
const port = 8888;

app.get('/', function (req : Request, res : Response) {
    res.send('I want become backend developer. Hello world!!!!');
});

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});