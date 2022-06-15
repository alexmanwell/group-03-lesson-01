export let bloggers = [
    {id: 1, name: 'About JS - 023', youtubeUrl: 'it-incubator.eu'},
    {id: 2, name: 'About JS - 02', youtubeUrl: 'it-incubator.eu'},
    {id: 3, name: 'About JS - 03', youtubeUrl: 'it-incubator.eu'},
];

export const bloggerRepository = {

    findAll() {
        return bloggers;
    },

    findById(id: number) {
        return bloggers.find(b => b.id === id)
    },

    create(body: any) {
        const blogger = {
            id: Date.now(),
            name: body.name,
            youtubeUrl: body.youtubeUrl
        };

        bloggers.push(blogger);
        return blogger;
    },

    update(body: any, id: number) {
        const blogger = bloggers.find(b => b.id === id);
        if (blogger) {
            blogger.name = body.name;
            blogger.youtubeUrl = body.youtubeUrl;
        }

        return blogger;
    },

    delete(id:number){
        const blogger = bloggers.find(b=> b.id === id);
        if(blogger){
            return bloggers = bloggers.filter(b => b.id !== id);
        }
        return blogger;
    }
};