import {User} from "../model/User";

export interface BloggerDAO {

    findById(id: number): User | null;

    findAll(): ReadonlyArray<User>;

    create(user: User): User | null;

    update(user: User): User | null;

    delete(id: number): boolean;
}