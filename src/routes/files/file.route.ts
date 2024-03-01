import express, { Request, Response, NextFunction } from 'express'
import { upload } from '../../aws/s3.aws'
import { verifyToken, JwtDecoded } from '../../auth/jwt.auth'
import FileController from '../../controllers/file.controller'

const fileRouter = express.Router();
const fileController = new FileController();

fileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user } = req.body;
    const files = await fileController.getAllFiles(user.id);
    return res.json(files);
  }catch(error){
    return next(error);
  }
})

fileRouter.post('/', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;
  try{
    if ( !file ) {
      throw "No file sent.";
    }
    const { user } = verifyToken(String(req.headers.token)) as JwtDecoded
    const createdFile = await fileController.createFile({ user, file });
    return res.json(createdFile);
  }catch(error){
    return next(error);
  }
})

fileRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user, fileId } = req.body;
    if( !fileId ){
      throw "File ID is necessary";
    }
    const deleteResult = await fileController.deleteFile({ fileId, ownerId: user.id });
    return res.json(deleteResult);
  }catch(error){
    return next(error);
  }
})

fileRouter.get('/download', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user, fileId } = req.body;
    if( !fileId ){
      throw "File ID is necessary";
    }
    return fileController.downloadFile({ fileId, userId: user.id, res });
  }catch(error){
    return next(error);
  }
})

export default fileRouter;