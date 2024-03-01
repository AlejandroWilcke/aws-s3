import { generateToken } from "../auth/jwt.auth";
import { comparePassword } from "../bcrypt/bcrypt";
import User from "../db/models/user.model";

export class AuthService {
  async getToken(email: string, password: string): Promise<any> {
    try{
      const user = await User.findOne( { where: { email } } );
      if(!user){
        throw "User does not exist.";
      }
      if(!comparePassword(password, user.password)){
        throw "Password incorrect.";
      }
      const token = generateToken(user)
      return token;
    }catch(error){
      return error;
    }
  }
}