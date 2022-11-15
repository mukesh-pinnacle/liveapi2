import { hash } from 'bcrypt';
import { CreateUserDto } from '@/dtos/super_admin/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@/interfaces/super_admin/users.interface';
import userModel from '@/models/super_admin/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const findUser: User = await this.users.findOne({ email: { $regex: new RegExp(userData.email, 'i') } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    if (userData.displayname !== '') {
      const findUserdisplayname: User = await this.users.findOne({ displayname: { $regex: new RegExp(userData.displayname, 'i') } });
      if (findUserdisplayname) throw new HttpException(409, `This display name ${userData.displayname} already exists`);
    }

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.name) {
      const findUser: User = await this.users.findOne({ name: userData.name });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This name ${userData.name} already exists`);
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(
      userId,
      { $set: userData, updated_at: Date.now() },
      { new: true, runValidators: true },
    );
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");
    return updateUserById;
  }

  public async deleteUser(userId: string, isActive: number): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndUpdate(
      userId,
      { $set: { is_active: isActive, updated_at: Date.now() } },
      { new: true, runValidators: true },
    );
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");
    return deleteUserById;
  }
}

export default UserService;
