import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import AppError from '../utils/app.error.js';

class AuthService {
    async register(data) {
        const existingUser = await UserModel.getUserByEmail(data.email);
        if(existingUser){
            throw new AppError("Email already in use", 409); // 409: Conflict
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const User = await UserModel.createUser({
            ...data,
            password: hashedPassword,
        });
        return User;
    }

    async login(email, password) {
        const user = await UserModel.getUserByEmail(email);
        if (!user){
            throw new AppError("Invalid email or password", 401); // 401: Unauthorized
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new AppError("Invalid email or password", 401);
        }
        return user;
    }
}
export default new AuthService();

