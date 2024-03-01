import { Table, Column, Model, Unique, HasMany, BelongsToMany, DataType, BeforeCreate } from 'sequelize-typescript';
import File from './file.model';
import UserFile from './userFile.model';
import { hashPassword } from '../../bcrypt/bcrypt';

@Table
class User extends Model {

  @Column(DataType.STRING)
  firstName: string

  @Column(DataType.STRING)
  lastName?: string

  @Unique
  @Column(DataType.STRING)
  email: string

  @Column(DataType.STRING)
  password: string

  @HasMany(() => File, 'ownerId')
  files: File[];

  @BelongsToMany(() => File, () => UserFile)
  sharedFiles: File[];

  @BeforeCreate
  static hashAndSavePassword(user: User) {
    user.password = hashPassword(user.password)
  }

}

export default User