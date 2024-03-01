import { Table, Column, Model,DataType, ForeignKey } from 'sequelize-typescript';
import User from './user.model';
import File from './file.model'

@Table
class UserFile extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
    onDelete: 'RESTRICT'
  })
  userId: number;

  @ForeignKey(() => File)
  @Column({
    type: DataType.NUMBER,
    onDelete: 'RESTRICT'
  })
  fileId: number;
}

export default UserFile