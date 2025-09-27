import AuthService from "../services/auth.service.js";
import zodValidation  from "../utils/zod.schemas.js";

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
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}

export default new AuthController();