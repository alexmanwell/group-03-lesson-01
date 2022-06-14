import {BloggerDAO} from "./BloggerDAO";
import {User} from "../model/User";

export class BloggerInMemoryImpl implements BloggerDAO {

    private users: Array<User> = [
        new User(1, "alex", "https:\/\/www.youtube.com\/c\/RollingScopesSchool"),
        new User(2, "dimas", "https:\/\/www.youtube.com\/c\/ITINCUBATOR"),
        new User(3, "pivas", "https:\/\/www.youtube.com\/channel\/UCTW0FUhT0m-Bqg2trTbSs0g"),
        new User(4, "sinivan", "https:\/\/www.youtube.com\/c\/ArchakovBlog"),
        new User(5, "baklajan", "https:\/\/www.youtube.com\/c\/UlbiTV"),
    ];

    private lastIndex = this.users.length;

    private incrementIndex() {
        return ++this.lastIndex;
    }

    create(user: User): User {
        console.log("user:", user);
        const id : number = this.incrementIndex();
        const newUser: User = new User(id, user.name, user.youtubeUrl);
        console.log("newUser:", newUser);
        this.users.push(newUser);
        return newUser;
    }

    delete(id: number): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index != -1) {
            this.users.splice(index, 1);
            return true;
        }

        console.log("bad removing");
        return false;
    }

    findAll(): ReadonlyArray<User> {
        return this.users;
    }

    findById(id: number): User | null {
        const user = this.users.find(user => user.id === id);
        return (!user) ? null : user;
    }

    update(user: User): User {
        const index = this.users.findIndex(u => u.id === user.id);
        return this.users[index] = user;
    }
}