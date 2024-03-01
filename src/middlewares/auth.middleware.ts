import { Request, Response, NextFunction } from "express";
import { JwtDecoded, verifyToken } from "../auth/jwt.auth";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
  const { token } = req.headers;

  if(!token){
    return res.status(401).send("Token not provided");
  }

  const { user } = verifyToken(String(token)) as JwtDecoded;

  if(!user){
    return res.status(401).send('Not authorized');
  }

  req.body.user = user
  
  next();
};

export default authMiddleware;