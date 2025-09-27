import AuthService from "../services/auth.service.js";
import zodValidation  from "../utils/zod.schemas.js";
import TokenService from "../services/token.service.js";

class AuthController {

    async register(req,res){
        try {
            // validation
            const validateData = zodValidation.registerSchema.parse(req.body);
            const user = await AuthService.register(validateData);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({message: error.message});
        }

    }

    async login(req,res){
        try{
            const validateData = zodValidation.loginSchema.parse(req.body);
            const user = await AuthService.login(validateData.email, validateData.password);
            const accessToken = await TokenService.generateAccessToken(user.id, user.email);
            const refreshToken = await TokenService.generateRefreshToken(user.id, user.email);
            res.status(200).json({ user, accessToken , refreshToken });
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}

export default new AuthController();