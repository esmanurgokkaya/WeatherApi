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
    async login(email, password) {
        const user = await UserModel.getUserByEmail(email);

        if(!user){
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            throw new Error("Invalid email or password");
        }

        return user;
    }
}
export default new AuthService();

