import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { signInSuperadminDto } from '@/dtos/super_admin/signInSuperadmin.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/super_adminAuth.interface';
import { Superadmin } from '@/interfaces/super_admin/superadmin.interface';
import superadminModel from '@/models/super_admin/superadmin.model';
import { isEmpty } from '@utils/util';

class SuperAdminAuth {
  public superadmin = superadminModel;

  public async signup(userData: signInSuperadminDto): Promise<Superadmin> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Superadmin = await this.superadmin.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Superadmin = await this.superadmin.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: signInSuperadminDto): Promise<{ cookie: string; findUser: Superadmin; tokenData: object }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Superadmin = await this.superadmin.findOne({ email: userData.email });
    console.log('Superadmin == ', JSON.stringify(findUser));

    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser, tokenData };
  }

  public async logout(userData: Superadmin): Promise<Superadmin> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Superadmin = await this.superadmin.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public createToken(user: Superadmin): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default SuperAdminAuth;
