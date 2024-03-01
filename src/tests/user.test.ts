import { sequelizeTest } from "./index.test";
import User from "../db/models/user.model";

describe("[UserModel]:", () => {
  let user: User;
  test("should create a User in the database", async () => {
    const { User } = sequelizeTest.models;
    const mockUser = {
      firstName: 'Ale',
      lastName: 'Wilcke',
      email: 'alewilcke@gmail.com',
      password: 'superpassword'
    }
    const createdUser = await User.create(mockUser);
    user = createdUser.dataValues;
    expect(user.firstName).toBe(mockUser.firstName);
    expect(1+1).toBe(2)
  })
})