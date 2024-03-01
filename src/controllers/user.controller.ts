import User from "../db/models/user.model";
import { UserService, CreateUserDTO } from "../services/user.service";

export default class UserController {

  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  createUser(createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.createUser(createUserDTO);
  }
}