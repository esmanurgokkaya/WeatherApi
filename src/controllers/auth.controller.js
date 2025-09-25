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
}

export default new AuthController();