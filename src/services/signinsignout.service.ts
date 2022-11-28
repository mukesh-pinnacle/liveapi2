
import { SigninSignoutDto } from '@dtos/app/signinsignout.dto';
import { HttpException } from '@exceptions/HttpException';
import { SigninSignoutInt } from '@interfaces/app/signinsignout.interface';
import SigninSignoutModel from '@models/app/signinsignout.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class SigninSignoutService {
    public signinSignoutModel = SigninSignoutModel;
    public async createSigninSingout(accountId: string, reqData: SigninSignoutDto): Promise<SigninSignoutInt> {
        if (isEmpty(reqData)) throw new HttpException(400, 'request data is empty');
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');

        // const findWorkingHours: SigninSignoutInt = await this.signinSignoutModel.findOne({ $and: [{ inboxes_id: reqWorkingData.inboxes_id, account_id: accountId, inbox_shift_id: reqWorkingData.inbox_shift_id }] });
        // //console.log("service ==  > ",findcustomAttribute);
        // if (findWorkingHours) throw new HttpException(409, `The working for Inbox ID: ${reqWorkingData.inboxes_id}  for account ${accountId} is already exists`);
        const createData = {
            "account_id": accountId,
            ...reqData
        };
        const createResult: SigninSignoutInt = await this.signinSignoutModel.create(createData);
        return createResult;
    }

    public async updateSigninSignout(id: string, accountID: string, requestData: SigninSignoutDto): Promise<SigninSignoutInt> {
        if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
        if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid');
        if (isEmpty(id)) throw new HttpException(400, 'SignIn-SignOut Id is empty');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'SignIn-SignOut Id is invalid');
        const updateResultById: SigninSignoutInt = await this.signinSignoutModel.findByIdAndUpdate({ _id: id, account_id: accountID },
            { $set: requestData, signout_at: Date.now() }, { new: true, runValidators: true });
        if (!updateResultById) throw new HttpException(409, "Signin- Signout doesn't exist");
        return updateResultById;
    }


      public async findAll(accountID: string): Promise<SigninSignoutInt[]> {
        if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid');
        const getWorkingResult: SigninSignoutInt[] = await this.signinSignoutModel.find({ account_id: accountID }).sort({ _id: -1 });
        if (getWorkingResult.length === 0) throw new HttpException(409, `Signin-Signout details Not available for ${accountID}`);
        return getWorkingResult;
      }

      public async findById(accountID: string, id: string): Promise<SigninSignoutInt> {
        if (isEmpty(id)) throw new HttpException(400, 'Signin-Signout Id is empty');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Signin-Signout Id is invalid');
        if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid')
        const result: SigninSignoutInt = await this.signinSignoutModel.findOne({ _id: id, account_id: accountID });
        if (!result) throw new HttpException(409, "Working hours doesn't exist");

        return result;
      }

}

export default SigninSignoutService;
