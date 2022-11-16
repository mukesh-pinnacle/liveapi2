import { Router } from 'express';
import AccountsController from '@/controllers/super_admin/account.controller';
import { CreateAccountDto } from '@/dtos/super_admin/accounts.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import superadminAuthMiddleware from '@/middlewares/superadminAuth.middleware';

class AccountsRoute implements Routes {
  public path = '/super_admin/accounts';
  public router = Router();
  public accountsController = new AccountsController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, superadminAuthMiddleware, this.accountsController.getAccounts);
    this.router.get(`${this.path}/users`, superadminAuthMiddleware, this.accountsController.getAccountUsers);
    this.router.get(`${this.path}/:id`, superadminAuthMiddleware, this.accountsController.getAccountById);
    this.router.post(`${this.path}`, validationMiddleware(CreateAccountDto, 'body'), superadminAuthMiddleware, this.accountsController.createAccount);
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateAccountDto, 'body', true),
      superadminAuthMiddleware,
      this.accountsController.updateAccount,
    );
    this.router.get(`${this.path}/:id/:isActive`, superadminAuthMiddleware, this.accountsController.deleteAccount);
  }
}
export default AccountsRoute;
