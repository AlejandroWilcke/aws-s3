import { Table, Column, Model, BelongsTo, BelongsToMany, DataType, ForeignKey } from 'sequelize-typescript';
import User from './user.model';
import UserFile from './userFile.model'

@Table
class File extends Model {

  @Column(DataType.STRING)
  fileName: string

  @ForeignKey(() => User)
  ownerId: number

  @BelongsTo(() => User, 'ownerId')
  owner: User

  @BelongsToMany(() => User, () => UserFile)
  sharedWith: User[];

}

export default File