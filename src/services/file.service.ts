import path from 'path';
import { Response } from 'express';
import { Op } from 'sequelize';
import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { formattedFilename, sendCommand } from '../aws/s3.aws';
import File from "../db/models/file.model";
import User from "../db/models/user.model";
import sequelize from '../db';
import UserFile from '../db/models/userFile.model';

const transaction = sequelize.transaction()

const { AWS_S3_BUCKET } = process.env;

export interface FilesDTO {
  ownedFiles: File[];
  sharedFiles: File[];
}

export interface CreateFileDTO {
  user: User;
  file: any;
}

export interface DeleteFileDTO {
  fileId: number;
  ownerId: number;
}

export interface DownloadFileDTO {
  fileId: number;
  userId: number;
  res: Response;
}

export class FileService {

  async getAllFiles(userId: number): Promise<FilesDTO> {
    const ownedFiles = await File.findAll({
      where: {
        ownerId: userId
      },
    })
    const sharedFiles = await File.findAll({
      include: [{
        model: User,
        as: 'sharedWith',
        where: { id: userId },
      }],
    });
    return { ownedFiles, sharedFiles };
  }

  async createFile(createFileDTO: CreateFileDTO): Promise<any> {
    try{
      const createdFile = await sequelize.transaction(async t => {
        const { file, user } = createFileDTO;
        const fileExtension = path.extname(file.originalname);
        const formattedName = formattedFilename(user, fileExtension)

        const createdFile = await File.create({
          ownerId: user.id,
          fileName: formattedName
        }, { transaction: t })
    
        if(!createdFile){
          throw "Error creating file in database."
        }

        const params = {
          Key: formattedName,
          Body: file.buffer
        }

        const data = await sendCommand(params, PutObjectCommand);
    
        if(!data){
          throw "There was an error UPLOADING the file to AWS S3.";
        }
    
        return createdFile;
      })
      return createdFile;
    }catch(error){
      (await transaction).rollback()
    }
  }

  async deleteFile(deleteFileDTO: DeleteFileDTO): Promise<Boolean> {
    try{
      const isFileDeleted: boolean = await sequelize.transaction(async t => {
        const { fileId, ownerId } = deleteFileDTO;
        const fileToBeDeleted = await File.findOne({
          where: {
            [Op.and]: {
              id: fileId,
              ownerId: ownerId,
            }
          },
        })
    
        if( !fileToBeDeleted ){
          throw "File does not exist or you are not the owner.";
        }
    
        const deletedFile = await File.destroy({
          where: {
            [Op.and]: {
              id: fileId,
              ownerId: ownerId,
            }
          },
        })
    
        if(!deletedFile){
          throw "There was an error deleting the file from the database.";
        }

        const params = { Key: fileToBeDeleted.fileName }

        const data = await sendCommand(params, DeleteObjectCommand);
    
        if(!data){
          throw "There was an error DELETING the file to AWS S3.";
        }
    
        return deletedFile === 1 ? true : false;
      })
      return isFileDeleted
    }catch(error){
      (await transaction).rollback()
      throw(error);
    }
  }

  async downloadFile(downloadFileDTO: DownloadFileDTO): Promise<any> {
    const { fileId, userId, res } = downloadFileDTO;
    try{

      const fileToBeDownloaded = await File.findOne({
        where: {
          id: fileId
        },
      })

      if( !fileToBeDownloaded ){
        return res.send("File does not exist");
      }

      const userShared = await UserFile.findOne({
        where: {
          [Op.and]: {
            userId,
            fileId
          }
        }
      })

      if( !userShared && fileToBeDownloaded.ownerId != userId ){
        return res.send("You do not have the rights to download the file");
      }

      const params = { Key: fileToBeDownloaded.fileName }

      const fileStream: any = await sendCommand(params, GetObjectCommand);
      res.attachment(fileToBeDownloaded.fileName);
      fileStream.Body.pipe(res)
    }catch(error){
      return res.send(error);
    }
  }

}