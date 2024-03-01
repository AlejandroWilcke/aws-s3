import express from 'express'
import authRouter from './auth/auth.route'
import userRouter from './user/user.route'
import fileRouter from './files/file.route'
import userFileRouter from './user-file/user-file.route'
import authMiddleware from '../middlewares/auth.middleware'

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.use(authMiddleware);

router.use('/files', fileRouter);
router.use('/user-files', userFileRouter);

export default router;