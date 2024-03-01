import { Sequelize } from 'sequelize-typescript';
import User from './models/user.model';
import File from './models/file.model';
import UserFile from './models/userFile.model';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './src/db/database.sqlite',
});

sequelize.addModels([User, File, UserFile]);

export default sequelize;