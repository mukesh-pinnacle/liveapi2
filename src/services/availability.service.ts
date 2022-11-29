import { AvailabilityInt } from '@/interfaces/app/availability.interface';
import { AvailabilityDto } from '@dtos/app/availability.dto';
import { HttpException } from '@exceptions/HttpException';
import AvailabilityModel from '@models/app/availability.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class AvailabiltyService {
    public availabilityModel = AvailabilityModel;
    public async createAvailability(accountId: string, reqData: AvailabilityDto): Promise<AvailabilityInt> {
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
        const createResult: AvailabilityInt = await this.availabilityModel.create(createData);
        return createResult;
    }

    // public async updateSigninSignout(id: string, accountID: string, requestData: SigninSignoutDto): Promise<SigninSignoutInt> {
    //     if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
    //     if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
    //     if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid');
    //     if (isEmpty(id)) throw new HttpException(400, 'SignIn-SignOut Id is empty');
    //     if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'SignIn-SignOut Id is invalid');
    //     const updateResultById: SigninSignoutInt = await this.signinSignoutModel.findByIdAndUpdate({ _id: id, account_id: accountID },
    //         { $set: requestData, signout_at: Date.now() }, { new: true, runValidators: true });
    //     if (!updateResultById) throw new HttpException(409, "Signin- Signout doesn't exist");
    //     return updateResultById;
    // }


      public async findAll(accountID: string): Promise<AvailabilityInt[]> {
        if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid');
        const getWorkingResult: AvailabilityInt[] = await this.availabilityModel.find({ account_id: accountID }).sort({ _id: -1 });
        if (getWorkingResult.length === 0) throw new HttpException(409, `availability details Not available for ${accountID}`);
        return getWorkingResult;
      }

      public async findById(accountID: string, id: string): Promise<AvailabilityInt> {
        if (isEmpty(id)) throw new HttpException(400, 'Availability Id is empty');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Availability Id is invalid');
        if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid')
        const result: AvailabilityInt = await this.availabilityModel.findOne({ _id: id, account_id: accountID });
        if (!result) throw new HttpException(409, "Availability doesn't exist");

        return result;
      }

}

export default AvailabiltyService;
