import {BloggerDAO} from "./BloggerDAO";
import {User} from "../model/User";

export class BloggerInMemoryImpl implements BloggerDAO {

    private readonly users: Array<User>;

    constructor(users : Array<User>) {
        this.users = users;
    }

    private lastIndex = () => this.users[this.users.length - 1].id;

    private incrementIndex = () => this.lastIndex() + 1;

    public create(user: User): User | null{
        const id : number = (user.id !== - 1) ? user.id : this.incrementIndex();
        const newUser: User = new User(id, user.name, user.youtubeUrl);
        this.users.push(newUser);
        return this.findById(newUser.id);
    }

    public delete(id: number): boolean {
        const index : number = this.users.findIndex(user => user.id === id);
        if (index != -1) {
            this.users.splice(index, 1);
            return true;
        }

        return false;
    }

    public findAll(): ReadonlyArray<User> {
        return this.users;
    }

    public findById(id: number): User | null {
        const user = this.users.find(user => user.id === id);
        return (user) ? user : null;
    }

    public update(user: User): User | null{
        const index : number = this.users.findIndex(u => u.id === user.id);
        return (index !== - 1) ? this.users[index] = user : null;
    }
}