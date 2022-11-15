import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/super_adminAuth.interface';
import superadminModel from '@/models/super_admin/superadmin.model';

const superadminAuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    console.log('Authorization == ' + JSON.stringify(Authorization));

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const superadminId = verificationResponse._id;
      console.log('superadminId ==>> ', superadminId);

      const findUser = await superadminModel.findById(superadminId);
      console.log('findUser ==>>> ', JSON.stringify(findUser));

      if (findUser) {
        req.superadmin = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default superadminAuthMiddleware;
