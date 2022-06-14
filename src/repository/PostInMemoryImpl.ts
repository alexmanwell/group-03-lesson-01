import {PostDAO} from "./PostDAO";
import {Post} from "../model/Post";
import {User} from "../model/User";

export class PostInMemoryImpl implements PostDAO {

    private posts: Array<Post> = [
        new Post(1, "title - 1", "description - 1", "content - 1",
            new User(1, "alex", "https:\/\/www.youtube.com\/c\/RollingScopesSchool")
        ),
        new Post(2, "title - 2", "description - 2", "content - 2",
            new User(2, "dimas", "https:\/\/www.youtube.com\/c\/ITINCUBATOR")
        ),
        new Post(3, "title - 3", "description - 3", "content - 3",
            new User(2, "dimas", "https:\/\/www.youtube.com\/c\/ITINCUBATOR")
        ),
        new Post(4, "title - 4", "description - 4", "content - 4",
            new User(2, "dimas", "https:\/\/www.youtube.com\/c\/ITINCUBATOR")
        ),
        new Post(5, "title - 5", "description - 5", "content - 5",
            new User(1, "alex", "https:\/\/www.youtube.com\/c\/RollingScopesSchool")
        )
    ];

    private lastIndex = this.posts.length;

    private incrementIndex() {
        return ++this.lastIndex;
    }

    create(post: Post): Post | null {
        const id: number = this.incrementIndex();
        const newPost: Post = new Post(id, post.title, post.shortDescription, post.content, post.blogger);
        this.posts.push(newPost);
        return this.findById(id);
    }

    delete(id: number): boolean {
        const index : number = this.posts.findIndex(post => post.id === id);
        if (index != -1) {
            this.posts.splice(index, 1);
            return true;
        }

        console.log("bad removing");
        return false;
    }

    findAll(): ReadonlyArray<Post> {
        return this.posts;
    }

    findById(id: number): Post | null {
        const post = this.posts.find(post => post.id === id);
        return (post) ? post : null;
    }

    update(post: Post): Post | null {
        const index: number = this.posts.findIndex(p => p.id === post.id);
        return (index !== -1) ? this.posts[index] = post : null;
    }
}