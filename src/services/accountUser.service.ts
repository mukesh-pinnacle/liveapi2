import { CreateAccountUserDto } from '@/dtos/super_admin/accountUser.dto';
import { HttpException } from '@exceptions/HttpException';
import { AccountUser } from '@/interfaces/super_admin/account_users.interface';
import accountUserModel from '@/models/super_admin/account_users.model';
import { isEmpty } from '@utils/util';

class AccountUserService {
  public accountUser = accountUserModel;
  public async findAllAccountUser(): Promise<AccountUser[]> {
    const accounts: AccountUser[] = await this.accountUser.aggregate([
      {
        $lookup: {
          from: 'accounts',
          localField: 'account_id',
          foreignField: '_id',
          pipeline: [{ $project: { name: '$name' } }],
          as: 'companyName',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          pipeline: [{ $project: { name: '$name' } }],
          as: 'userName',
        },
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          pipeline: [{ $project: { role: '$role' } }],
          as: 'roles',
        },
      },
      {
        $project: {
          _id: 1,
          is_active: 1,
          companyName: 1,
          userName: 1,
          roles: 1,
        },
      },
    ]);

    return accounts;
  }

  public async findAccountUserById(AccountUserId: string): Promise<AccountUser> {
    if (isEmpty(AccountUserId)) throw new HttpException(400, 'AccountUserId is empty');

    const findAccountUser: AccountUser = await this.accountUser.findOne({ _id: AccountUserId });
    if (!findAccountUser) throw new HttpException(409, "AccountUser doesn't exist");
    return findAccountUser;
  }

  public async createAccountUser(accountUserData: CreateAccountUserDto): Promise<AccountUser> {
    if (isEmpty(accountUserData)) throw new HttpException(400, 'accountData is empty');
    const findAccountUser: AccountUser = await this.accountUser.findOne({ account_id: accountUserData.account_id, user_id: accountUserData.user_id });
    if (findAccountUser)
      throw new HttpException(409, `This Account ${accountUserData.account_id} and User ${accountUserData.user_id} already exists`);

    const createAccountData: AccountUser = await this.accountUser.create({ ...accountUserData });

    return createAccountData;
  }

  public async updateAccountUser(accountUserId: string, accountUserData: CreateAccountUserDto): Promise<AccountUser> {
    if (isEmpty(accountUserData)) throw new HttpException(400, 'accountUserData is empty');

    if (accountUserData.account_id && accountUserData.user_id && accountUserData.role) {
      const findAccountUser: AccountUser = await this.accountUser.findOne({
        account_id: accountUserData.account_id,
        user_id: accountUserData.user_id,
        role: accountUserData.role,
      });
      if (findAccountUser)
        throw new HttpException(409, `This AccountId ${accountUserData.account_id} and UserId ${accountUserData.account_id} already exists`);
    }

    const updateAccountUserById: AccountUser = await this.accountUser.findByIdAndUpdate(
      accountUserId,
      { $set: accountUserData, updated_at: Date.now() },
      { new: true, runValidators: true },
    );
    if (!updateAccountUserById) throw new HttpException(409, "AccountUser doesn't exist");
    return updateAccountUserById;
  }

  public async deleteAccountUser(accountUserId: string, isActive: number): Promise<AccountUser> {
    const deleteAccountUserById: AccountUser = await this.accountUser.findByIdAndUpdate(
      accountUserId,
      { $set: { is_active: isActive, updated_at: Date.now() } },
      { new: true, runValidators: true },
    );
    if (!deleteAccountUserById) throw new HttpException(409, "AccountUser doesn't exist");
    return deleteAccountUserById;
  }
}

export default AccountUserService;
