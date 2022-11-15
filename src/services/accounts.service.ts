import { CreateAccountDto } from '@/dtos/super_admin/accounts.dto';
import { HttpException } from '@exceptions/HttpException';
import { Account } from '@/interfaces/super_admin/accounts.interface';
import accountModel from '@/models/super_admin/accounts.model';
import { isEmpty } from '@utils/util';

class AccountService {
  public accounts = accountModel;

  public async findAllAccount(): Promise<Account[]> {
    // const accounts: Account[] = await this.accounts.find();
    const accounts: Account[] = await this.accounts.aggregate([
      {
        $lookup: {
          from: 'locales',
          localField: 'locale_id',
          foreignField: '_id',
          pipeline: [{ $project: { lang: { data: '$lng' } } }, { $replaceRoot: { newRoot: '$lang' } }],
          as: 'lng',
        },
      },
      {
        $lookup: {
          from: 'accountusers',
          localField: '_id',
          foreignField: 'account_id',
          pipeline: [{ $project: { usersid: '$user_id' } }],
          as: 'userCount',
        },
      },
      {
        $project: {
          _id: 1,
          account_id: 1,
          name: 1,
          domain: 1,
          support_email: 1,
          is_active: 1,
          locale_id: 1,
          lng: 1,
          userCount: 1,
        },
      },
    ]);
    return accounts;
  }

  public async findAccountById(AccountId: string): Promise<Account> {
    if (isEmpty(AccountId)) throw new HttpException(400, 'AccountId is empty');
    const findAccount: Account = await this.accounts.findOne({ _id: AccountId });
    if (!findAccount) throw new HttpException(409, "Account doesn't exist");
    return findAccount;
  }

  public async createAccount(accountData: CreateAccountDto): Promise<Account> {
    if (isEmpty(accountData)) throw new HttpException(400, 'accountData is empty');
    const findAccount: Account = await this.accounts.findOne({ name: { $regex: new RegExp(accountData.name, 'i') } });
    if (findAccount) throw new HttpException(409, `This Account ${accountData.name} already exists`);

    const createAccountData: Account = await this.accounts.create({ ...accountData });

    return createAccountData;
  }

  public async updateAccounnt(accountId: string, accountData: CreateAccountDto): Promise<Account> {
    if (isEmpty(accountData)) throw new HttpException(400, 'userData is empty');

    if (accountData.name) {
      const findAccount: Account = await this.accounts.findOne({ name: accountData.name });
      if (findAccount && findAccount._id != accountId) throw new HttpException(409, `This name ${accountData.name} already exists`);
    }

    const updateUserById: Account = await this.accounts.findByIdAndUpdate(
      accountId,
      { $set: accountData, updated_at: Date.now() },
      { new: true, runValidators: true },
    );
    if (!updateUserById) throw new HttpException(409, "Account doesn't exist");
    return updateUserById;
  }

  public async deleteAccount(accountId: string, isActive: number): Promise<Account> {
    const deleteUserById: Account = await this.accounts.findByIdAndUpdate(
      accountId,
      { $set: { is_active: isActive, updated_at: Date.now() } },
      { new: true, runValidators: true },
    );
    if (!deleteUserById) throw new HttpException(409, "Account doesn't exist");
    return deleteUserById;
  }
}

export default AccountService;
