import { Sequelize } from 'sequelize-typescript';
import User from '../db/models/user.model';
import File from '../db/models/file.model';
import UserFile from '../db/models/userFile.model';

let sequelizeTest: Sequelize;

beforeAll( async () => {
  sequelizeTest = new Sequelize({
    dialect: 'sqlite',
    storage: './src/tests/testDatabase.sqlite',
    logging: false
  });
  sequelizeTest.addModels([User, File, UserFile]);
  await User.sync()
  await File.sync()
  await UserFile.sync()
});

afterAll( async () => {
  User.destroy({ where: {} })
});

describe("initialize database:", () => {
  test("models should be in the database", () => {
    const models = Object.keys(sequelizeTest.models)
    expect(models).toHaveLength(3)
  })
})

export { sequelizeTest }