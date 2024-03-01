import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import User from '../db/models/user.model';

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET } = process.env

export const upload = multer({ storage: multer.memoryStorage() });

export const s3Client = new S3Client({
  region: AWS_REGION as string,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID as string,
    secretAccessKey: AWS_SECRET_ACCESS_KEY as string
  },
});

export const formattedFilename = (user: User, fileExtension: string) : string => {
  return `${user.firstName}${user.lastName}-${Date.now().toString()}${fileExtension}`
}

interface S3CommandParams {
  Key: string;
  Body?: any;
}

export const sendCommand = async (params: S3CommandParams, command: any) => {
  return await s3Client.send(new command({
    Bucket: AWS_S3_BUCKET as string,
    ...params
  }))
}