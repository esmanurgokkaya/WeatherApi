import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

class  UserService {

    async getUserProfile(id){
        const user = await UserModel.getUserById(id);

        if(!user){
            throw new Error("User not found");
        }

        return user;
    }

    async updateUser(id, data){
        const user = await UserModel.getUserById(id);

        if(!user){
            throw new Error("User not found");
        }

        return await UserModel.updateUser(id, data);
    }

    async updatePassword(id, oldPassword, newPassword){
        const user = await UserModel.getUserById(id);
        if(!user){
            throw new Error("User not found");
        }
        
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if(!isPasswordValid){
            throw new Error("Old password is incorrect");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);


        return await UserModel.updateUser(id, { password: hashedPassword });
    }

    async deleteUser(id){
        const user = await UserModel.getUserById(id);

        if(!user){
            throw new Error("User not found");
        }
    
        return await UserModel.deleteUser(id);
    }

    async getAllUsers(){
        return await UserModel.getAllUsers();
    }
}

export default new UserService();