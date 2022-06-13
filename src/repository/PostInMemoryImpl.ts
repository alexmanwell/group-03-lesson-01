
import {PostDAO} from "./PostDAO";
import {Post} from "../model/Post";

export class PostInMemoryImpl implements PostDAO {
    create(post: Post): Post {
        return post;
    }

    delete(id: number): void {
    }

    findAll(): ReadonlyArray<Post> {
        return new Array;
    }

    findById(id: number): Post | undefined {
        return new Post();
    }

    update(post: Post): Post {
        return post;
    }
}