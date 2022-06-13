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

    create(user: User): User {
        const id : number = +new Date();
        this.users.push(new User(id, user.name, user.youtubeUrl));
        return user;
    }

    delete(id: number): void {
        const index = this.users.findIndex(user => user.id === id);
        if (index != -1) {
            this.users.splice(index, 1);
        }
    }

    findAll(): ReadonlyArray<User> {
        return this.users;
    }

    findById(id: number): User | undefined {
        const user = this.users.find(user => user.id === id);
        return (!user) ? undefined : user;
    }

    update(user: User): User {
        const index = this.users.findIndex(u => u.id === user.id);
        return this.users[index] = user;
    }
}