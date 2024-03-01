import File from "../db/models/file.model";
import UserFile from "../db/models/userFile.model";
import { Op } from "sequelize";

export interface CreateSharedDTO {
  ownerId: number;
  userId: number;
  fileId: number;
}

export interface DeleteSharedDTO {
  ownerId: number;
  userId: number;
  fileId: number;
}

export class UserFileService {
  async createShared(createSharedDto: CreateSharedDTO): Promise<any> {
    try{
      const { ownerId, userId, fileId  } = createSharedDto;

      if( !fileId || !userId ){
        throw "Both a userId and a fileId are necessary to share the file";
      }

      const fileToBeShared = await File.findOne({ where: { id: fileId }})

      if( !fileToBeShared ){
        throw "File does not exist.";
      }

      if( fileToBeShared.ownerId != ownerId ){
        throw "Only the owner can share the file.";
      }

      const createShared = await UserFile.create({ userId, fileId })

      if(!createShared){
        throw "Error creating relationship between file and user"
      }

      return createShared;
    }catch(error){
      return error;
    }
  }
  async deleteShared(deleteSharedDto: DeleteSharedDTO): Promise<any> {
    try{
      const { ownerId, userId, fileId  } = deleteSharedDto;

      if( !fileId || !userId ){
        throw "Both a userId and a fileId are necessary to delete the share permission";
      }

      const fileToBeUnShared = await File.findOne({ where: { id: fileId }})

      if( !fileToBeUnShared ){
        throw "File does not exist.";
      }

      if( fileToBeUnShared.ownerId != ownerId ){
        throw "Only the owner can unshare the file.";
      }

      const deletedRelationship = await UserFile.destroy({
        where: {
          [Op.and]: {
            userId,
            fileId,
          }
        },
      })

      if(!deletedRelationship){
        throw "Error deleting relationship between file and user"
      }

      return deletedRelationship;
    }catch(error){
      return error;
    }
  }
}