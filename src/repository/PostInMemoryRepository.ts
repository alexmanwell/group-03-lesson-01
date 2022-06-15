let posts = [
    {
        id: 1,
        title: "title1",
        shortDescription: "description - 1",
        content: "content - 1",
        bloggerId: 1,
        bloggerName: "alex"
    },
    {
        id: 2,
        title: "title - 2",
        shortDescription: "description - 2",
        content: "content - 2",
        bloggerId: 1,
        bloggerName: "dimas"
    }
];


export const postRepository = {

    findAll() {
        return posts
    },

    findById(id: number) {
        return posts.find(p => p.id === id)
    },

    delete(id: number) {
        const countArray = posts.length;
        posts = posts.filter(p => p.id !== id);
        return posts.length < countArray;
    },

    create(body: any, blogger: any) {
        const newPost = {
            id: Date.now(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            bloggerId: body.bloggerId,
            bloggerName: blogger.name
        };
        posts.push(newPost);
        return newPost;
    },

    update(body: any, id: number) {
        let post = posts.find(p => p.id === id);
        if (post) {
            post.title = body.title;
            post.content = body.content;
            post.shortDescription = body.shortDescription;

            return post;
        }
    }
};