import { Router } from 'express';
import AccountsController from '@/controllers/super_admin/account.controller';
import { CreateAccountDto } from '@/dtos/super_admin/accounts.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';

class AccountsRoute implements Routes {
  public path = '/app/accounts';
  public router = Router();
  public accountsController = new AccountsController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.accountsController.getAccounts);
    this.router.get(`${this.path}/:id`, authMiddleware, this.accountsController.getAccountById);
    this.router.get(`${this.path}/:id/:isActive`, authMiddleware, this.accountsController.deleteAccount);
  }
}
export default AccountsRoute;
