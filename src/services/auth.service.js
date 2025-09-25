import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt';

class AuthService {

    async register(data) {
        
        // Check if email already exists
        const existingUser = await UserModel.getUserByEmail(data.email);

        if(existingUser){
            throw new Error("Email already in use");
        }

        // hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // create user
        const User = await UserModel.createUser({
            ...data,
            password: hashedPassword,
        });

        return User;
    }
}
export default new AuthService();

