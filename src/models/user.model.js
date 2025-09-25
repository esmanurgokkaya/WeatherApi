import prisma from '../config/db.js';

const User = prisma.user;

class UserModel{
// Decide whether to add static methods
    async createUser(data) {
        return await User.create({data});
    }

    async getUserByEmail(email) {
        return await User.findUnique({ where: { email } });
    }

    async getUserById(id) {
        return await User.findUnique({ where: { id } });
    }


}

export default new UserModel();