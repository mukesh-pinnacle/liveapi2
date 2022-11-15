import { NextFunction, Request, Response } from 'express';
import { CreateAccountUserDto } from '@/dtos/super_admin/accountUser.dto';
import { AccountUser } from '@/interfaces/super_admin/account_users.interface';
import accountUserService from '@services/accountUser.service';

class AccountUserController {
  public accountUserService = new accountUserService();

  public getAccountUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAccountsData: AccountUser[] = await this.accountUserService.findAllAccountUser();
      res.status(200).json({ data: findAllAccountsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAccountUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountUserId: string = req.params.id;
      const findOneAccountUserData: AccountUser = await this.accountUserService.findAccountUserById(accountUserId);
      res.status(200).json({ data: findOneAccountUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAccountUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountUserData: CreateAccountUserDto = req.body;
      const createAccountUserData: AccountUser = await this.accountUserService.createAccountUser(accountUserData);
      res.status(201).json({ data: createAccountUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAccountUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountUserId: string = req.params.id;
      const accountUserData: CreateAccountUserDto = req.body;
      const updateAccountUserData: AccountUser = await this.accountUserService.updateAccountUser(accountUserId, accountUserData);
      res.status(200).json({ data: updateAccountUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAccountUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountUserId: string = req.params.id;
      const isActive: number = parseInt(req.params.isActive);
      const deleteAccountUserData: AccountUser = await this.accountUserService.deleteAccountUser(accountUserId, isActive);
      res.status(200).json({ data: deleteAccountUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AccountUserController;
