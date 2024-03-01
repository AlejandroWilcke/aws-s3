import express, { Request, Response, NextFunction } from 'express';
import UserController from '../../controllers/user.controller';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const users = await userController.getAllUsers();
    return res.json(users);
  }catch(error: any){
    return next(error);
  }
})

userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const createdUser = await userController.createUser(req.body);
    return res.json(createdUser);
  }catch(error){
    return next(error);
  }
})

export default userRouter;