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

    create(user: User): User | null{
        console.log("user:", user);
        const id : number = (user.id !== - 1) ? user.id : this.incrementIndex();
        const newUser: User = new User(id, user.name, user.youtubeUrl);
        console.log("newUser:", newUser);
        this.users.push(newUser);
        return this.findById(newUser.id);
    }

    delete(id: number): boolean {
        const index : number = this.users.findIndex(user => user.id === id);
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
        return (user) ? user : null;
    }

    update(user: User): User | null{
        const index : number = this.users.findIndex(u => u.id === user.id);
        return (index !== - 1) ? this.users[index] = user : null;
    }
}