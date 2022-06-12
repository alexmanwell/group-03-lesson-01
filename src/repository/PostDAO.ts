import {Post} from "../model/Post";

export interface PostDAO {

    findById(id: number): Post | undefined;

    findAll(): ReadonlyArray<Post>;

    create(post: Post): Post;

    update(post: Post): Post;

    delete(id: number): void;

}