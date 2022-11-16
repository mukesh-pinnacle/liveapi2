import { NextFunction, Request, Response } from 'express';
import { CreateAccountDto } from '@/dtos/super_admin/accounts.dto';
import { Account } from '@/interfaces/super_admin/accounts.interface';
import accountService from '@services/accounts.service';

class AccountsController {
  public accountService = new accountService();

  public getAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAccountsData: Account[] = await this.accountService.findAllAccount();

      res.status(200).json({ data: findAllAccountsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public getAccountUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAccountsData: Account[] = await this.accountService.findAllAccountUsers();

      res.status(200).json({ data: findAllAccountsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAccountById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId: string = req.params.id;
      const findOneAccountData: Account = await this.accountService.findAccountById(accountId);

      res.status(200).json({ data: findOneAccountData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountData: CreateAccountDto = req.body;
      const createAccountData: Account = await this.accountService.createAccount(accountData);
      res.status(201).json({ data: createAccountData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId: string = req.params.id;
      const accountData: CreateAccountDto = req.body;
      const updateAccountData: Account = await this.accountService.updateAccounnt(accountId, accountData);
      res.status(200).json({ data: updateAccountData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId: string = req.params.id;
      const isActive: number = parseInt(req.params.isActive);
      const deleteAccountData: Account = await this.accountService.deleteAccount(accountId, isActive);
      res.status(200).json({ data: deleteAccountData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AccountsController;
