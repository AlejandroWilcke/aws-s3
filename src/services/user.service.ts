import User from "../db/models/user.model";

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserService {

  async getAllUsers(): Promise<User[]> {
    return await User.findAll()
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    return await User.create({ ...user })
  }

}