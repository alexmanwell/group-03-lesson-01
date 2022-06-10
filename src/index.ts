import express, {Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: videos.length + 1,
        title: req.body.title,
        author: 'it-incubator.eu'
    };
    videos.push(newVideo);
    res.send(newVideo);
});

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});