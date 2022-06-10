import express, {Request, Response} from "express";

const app = express();

const port = 8888;

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
];

app.get('/', function (req : Request, res : Response) {
    res.send('I want become backend developer. Hello world!!!!');
});

app.get('/videos', function (req : Request, res : Response) {
    res.send(videos)
});

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id);
    if (!video) {
        res.sendStatus(404);
    } else {
        res.json(video)
    }
});

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});