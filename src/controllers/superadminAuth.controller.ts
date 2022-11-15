import { NextFunction, Request, Response } from 'express';
import { signInSuperadminDto } from '@/dtos/super_admin/signInSuperadmin.dto';
import { RequestWithUser } from '@interfaces/super_adminAuth.interface';
import { Superadmin } from '@/interfaces/super_admin/superadmin.interface';
import SuperadminAuthService from '@/services/superadminAuth.service';

class SuperadminAuthController {
  public superadminAuthService = new SuperadminAuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const superadminData: signInSuperadminDto = req.body;
      const signUpUserData: Superadmin = await this.superadminAuthService.signup(superadminData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const superadminData: signInSuperadminDto = req.body;
      const { cookie, findUser, tokenData } = await this.superadminAuthService.login(superadminData);
      console.log('cookie == ' + cookie);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ user: findUser, accessToken: tokenData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const superadminData: Superadmin = req.superadmin;
      const logOutUserData: Superadmin = await this.superadminAuthService.logout(superadminData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default SuperadminAuthController;
