import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {bloggerRoute} from "./route/BloggerRoute";
import {videosRoute} from "./route/VideosRoute";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8888;

app.use("/videos", videosRoute);
app.use("/bloggers", bloggerRoute);

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});