import TokenService from "../services/token.service.js";

export async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message: "Token missing"});
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Token missing"});
    }
    try {
        const user = await TokenService.verifyAccessToken(token);
        if(!user){
            return res.status(401).json({message: "Invalid token"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}