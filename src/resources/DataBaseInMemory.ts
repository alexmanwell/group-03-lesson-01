import {User} from "../model/User";
import {Post} from "../model/Post";

export const users: Array<User> = [
    new User(1, "alex", "https:\/\/www.youtube.com\/c\/RollingScopesSchool"),
    new User(2, "dimas", "https:\/\/www.youtube.com\/c\/ITINCUBATOR"),
    new User(3, "pivas", "https:\/\/www.youtube.com\/channel\/UCTW0FUhT0m-Bqg2trTbSs0g"),
    new User(4, "sinivan", "https:\/\/www.youtube.com\/c\/ArchakovBlog"),
    new User(5, "baklajan", "https:\/\/www.youtube.com\/c\/UlbiTV"),
];

export const posts: Array<Post> = [
    new Post(1, "title - 1", "description - 1", "content - 1",
        new User(11, "alex", "https:\/\/www.youtube.com\/c\/RollingScopesSchool")
    ),
    new Post(2, "title - 2", "description - 2", "content - 2",
        new User(2, "dimas", "https:\/\/www.youtube.com\/c\/ITINCUBATOR")
    ),
    new Post(3, "title - 3", "description - 3", "content - 3",
        new User(21, "dimas", "https:\/\/www.youtube.com\/c\/ITINCUBATOR")
    ),
    new Post(4, "title - 4", "description - 4", "content - 4",
        new User(21, "dimas", "https:\/\/www.youtube.com\/c\/ITINCUBATOR")
    ),
    new Post(5, "title - 5", "description - 5", "content - 5",
        new User(111, "alex", "https:\/\/www.youtube.com\/c\/RollingScopesSchool")
    ),
    new Post(5, "title - 5", "description - 5", "content - 5",
        new User(124323, "alex", "https:\/\/www.youtube.com\/c\/RollingScopesSchool")
    ),
    new Post(6, "title - 6", "description - 6", "content - 6",
        new User(12342)
    ),
    new Post(7, "title - 7", "description - 7", "content - 7",
        new User(3332)
    )
];