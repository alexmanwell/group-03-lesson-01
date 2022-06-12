import {User} from "../model/User";

export interface BloggerDAO {

    findById(id: number): User | undefined;

    findAll(): ReadonlyArray<User>;

    create(user: User): User;

    update(user: User): User;

    delete(id: number): void;
}