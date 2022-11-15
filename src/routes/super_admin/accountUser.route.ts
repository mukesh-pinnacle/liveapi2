import { Router } from 'express';
import AccountUserController from '@/controllers/super_admin/accountuser.controller';
import { CreateAccountUserDto } from '@/dtos/super_admin/accountUser.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import superadminAuthMiddleware from '@/middlewares/superadminAuth.middleware';

class AccountUserRoute implements Routes {
  public path = '/super_admin/accountuser';
  public router = Router();
  public accountUserController = new AccountUserController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, superadminAuthMiddleware, this.accountUserController.getAccountUser);
    this.router.get(`${this.path}/:id`, superadminAuthMiddleware, this.accountUserController.getAccountUserById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateAccountUserDto, 'body'),
      superadminAuthMiddleware,
      this.accountUserController.createAccountUser,
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateAccountUserDto, 'body', true),
      superadminAuthMiddleware,
      this.accountUserController.updateAccountUser,
    );
    this.router.get(`${this.path}/:id/:isActive`, superadminAuthMiddleware, this.accountUserController.deleteAccountUser);
  }
}
export default AccountUserRoute;
