const { getCache, setCache, delCache } = require('../../redis/cache.service');
let posts = [
    {
        id: 1,
        name: 'thang',
        title: 'is member NodeJS',
        description: 'Homework 79',
        email: 'levanthang@gmail.com',
    },
    {
        id: 2,
        name: 'Phúc',
        title: 'is member NodeJS',
        description: 'Homework 26',
        email: 'nguyenhuuphuc@gmail.com',
    },
];

export const getAll = () => {
    return posts;
};
export const getAlls = async () => {
    try {
        const cachedPosts = await getCache('allPost');
        if (cachedPosts) {
            return (cachedPosts);
        }
        await setCache('allPost', posts, 3600);
        return (posts);
    } catch (error) {
        return { error: error.message };
    }
};

export const getById = async (id) => {
    try {
        post = posts.find(post => post.id == id);
        if (!post)
            return `Not found user id : ${id}`
        return (post);
    } catch (error) {
        return { error: error.message };
    }
};

export const addUser = async (post) => {
    if (!post)
        return `Not found post`
    posts.push(post)
    await delCache('allPost');
    return post;
};

export const updateUser = async (id, post) => {
    const index = posts.findIndex((post) => post.id == id);
    if (index == -1)
        return (`Not found id : ${id}`);
    posts[index] = post;
    await delCache('allPost');
    await delCache('Post');
    return post;
};

export const updateDeUser = async (id, post) => {
    const index = posts.findIndex((post) => post.id == id);
    if (index == -1)
        return (`Not found id : ${id}`);
    posts[index].description = post.description;
    await delCache('allPost');
    await delCache('Post');
    return posts[index];
};

export const deleteUser = async (id) => {
    if (!id)
        return `Not found id : ${id}`;
    const index = posts.findIndex((post) => post.id == id);
    posts.splice(index, 1)
    await delCache('allPost');
    await delCache('Post');
    return `delete success user id : ${id}`;
};

export const i18n = (callback) => {
    callback(posts);
};