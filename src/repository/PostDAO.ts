import {Post} from "../model/Post";

export interface PostDAO {

    findById(id: number): Post | null;

    findAll(): ReadonlyArray<Post>;

    create(post: Post): Post | null;

    update(post: Post): Post | null;

    delete(id: number): boolean;
}