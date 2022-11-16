import { Router } from 'express';
import AccountsController from '@/controllers/super_admin/account.controller';
import { CreateAccountDto } from '@/dtos/super_admin/accounts.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';

class AppAccountsRoute implements Routes {
  public path = '/app/accounts';
  public router = Router();
  public accountsController = new AccountsController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/users`, authMiddleware, this.accountsController.getAccountUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, this.accountsController.getAccountById);
  }
}
export default AppAccountsRoute;
