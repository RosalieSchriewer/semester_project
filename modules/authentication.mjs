// Middleware
import jwt from "jsonwebtoken";
import HTTPCodes from "./httpConstants.mjs";

export function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    console.log(token)

    if (!token) {
        return res.status(HTTPCodes.ClientSideErrorResponse.Unauthorized).send("Unauthorized: No token provided");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            avatar_id: decoded.avatar_id,
            lightmode: decoded.lightmode
        };
        next();
    } catch (err) {
        return res.status(HTTPCodes.ClientSideErrorResponse.Unauthorized).send("Unauthorized: Invalid token");
        
    
    }
}
