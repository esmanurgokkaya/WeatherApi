import prisma from '../config/db.js';

const User = prisma.user;

class UserModel{
// static ekleyip eklememeye karar ver
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