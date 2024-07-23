
const { UserRepositorys } = require('../../database/data.user');
const { getCache, setCache, delCache } = require('../../redis/cache.service');
export class UserService {
    constructor() { this.UserRepositorys = new UserRepositorys }

    getAllUser = async (table) => {
        try {
            let cachedUsers = await getCache('allUsers');
            if (cachedUsers) {
                return (cachedUsers);
            }
            cachedUsers = await this.UserRepositorys.find(table);
            await setCache('allUsers', cachedUsers, 60);
            return (cachedUsers);
        } catch (error) {
            return { error: error.message };
        }

    };

    getUser = async (table, id) => {
        return await this.UserRepositorys.findById(table, id);;
    };

    updateUser = async (table, id, data) => {
        const allpost = await delCache('allUsers');
        return await this.UserRepositorys.update(table, id, data);
    };

    addUser = async (table, id, data) => {
        const allpost = await delCache('allUsers');
        return await this.UserRepositorys.save(table, id, data);
    }

    deleteUser = async (table, id) => {
        const allpost = await delCache('allUsers');
        return await this.UserRepositorys.delete(table, id);
    }
}
