import { HttpException } from '@/exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

const validateObjectId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const objectId: string = req.params.id;
    if(!Types.ObjectId.isValid(objectId)) return next(new HttpException(400, `Invalid id ${objectId}`));
    next();
  } catch (error) {
    next(new HttpException(500, 'Something went wrong'));
  }
};

export default validateObjectId;
