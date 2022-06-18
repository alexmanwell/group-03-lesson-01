import {User} from "../model/User";
import {Post} from "../model/Post";

type UserType = {
    id: number,
    name: string,
    youtubeUrl: string
};

type PostType = {
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number
}

export const users: UserType[] = [
    {id: 1, name: "alex", youtubeUrl: "https:\/\/www.youtube.com\/c\/RollingScopesSchool"},
    {id: 2, name: "dimas", youtubeUrl: "https:\/\/www.youtube.com\/c\/ITINCUBATOR"},
    {id: 3, name: "pivas", youtubeUrl: "https:\/\/www.youtube.com\/channel\/UCTW0FUhT0m-Bqg2trTbSs0g"},
    {id: 4, name: "sinivan", youtubeUrl: "https:\/\/www.youtube.com\/c\/ArchakovBlog"},
    {id: 5, name: "baklajan", youtubeUrl: "https:\/\/www.youtube.com\/c\/UlbiTV"}
];

export const posts: PostType[] = [
    {id: 1, title: "title - 1", shortDescription: "description - 1", content: "content - 1", bloggerId: 1},
    {id: 2, title: "title - 2", shortDescription: "description - 2", content: "content - 2", bloggerId: 2},
    {id: 3, title: "title - 3", shortDescription: "description - 3", content: "content - 3", bloggerId: 3},
    {id: 4, title: "title - 4", shortDescription: "description - 4", content: "content - 4", bloggerId: 4},
    {id: 5, title: "title - 5", shortDescription: "description - 5", content: "content - 5", bloggerId: 2},
    {id: 6, title: "title - 5", shortDescription: "description - 5", content: "content - 5", bloggerId: 1},
    {id: 7, title: "title - 6", shortDescription: "description - 6", content: "content - 6", bloggerId: 5},
    {id: 8, title: "title - 7", shortDescription: "description - 7", content: "content - 7", bloggerId: 1},
];