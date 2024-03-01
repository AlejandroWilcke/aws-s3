import express, { Request, Response, NextFunction } from 'express'
import AuthController from '../../controllers/auth.controller'

const authRouter = express.Router()
const authController = new AuthController();

authRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { email, password } = req.body;
    const token = await authController.getToken(email, password);
    return res.json(token);
  }catch(error){
    return next(error);
  }
})

export default authRouter;