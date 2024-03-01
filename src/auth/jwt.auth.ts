import jwt from 'jsonwebtoken'
import User from '../db/models/user.model';

const { JWT_SECRET_KEY } = process.env

export interface JwtDecoded {
  user: User
}

export function generateToken(user: User) {
  user.password = ''
  return jwt.sign({ user: user }, JWT_SECRET_KEY as string);
}

export function verifyToken(token: string){
  try {
    return jwt.verify(token, JWT_SECRET_KEY as string);
  } catch (error) {
    return null;
  }
}