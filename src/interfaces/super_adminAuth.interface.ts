import { Request } from 'express';
import { Superadmin } from '@/interfaces/super_admin/superadmin.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  superadmin: Superadmin;
}
