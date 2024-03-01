import express, { Request, Response, NextFunction } from 'express';
import UserFileController from '../../controllers/user-file.controller';

const userFileRouter = express.Router();
const userFileController = new UserFileController;

userFileRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user, userId, fileId  } = req.body
    const createShared = await userFileController.createShared({ ownerId: user.id, userId, fileId });
    return res.json(createShared)
  }catch(error: any){
    return next(error);
  }
})

userFileRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
		const { user, userId, fileId  } = req.body
    const fileToBeUnShared = await userFileController.deleteShared({ ownerId: user.id, userId, fileId });
    return res.json(fileToBeUnShared)
  }catch(error: any){
    return next(error);
  }
})

export default userFileRouter;