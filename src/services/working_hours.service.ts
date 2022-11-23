import { WorkingHoursDto } from '@dtos/app/working_hours.dto';
import { HttpException } from '@exceptions/HttpException';
import { WorkingHours } from '@interfaces/app/working_hours.interface';
import workingHoursModel from '@models/app/working_hours.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class WorkingHoursService {
  public workingHours = workingHoursModel;

  public async findAll(accountID: string): Promise<WorkingHours[]> {
    if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid');
    const getWorkingResult: WorkingHours[]= await this.workingHours.find({ account_id: accountID }).sort({ _id: -1 });
    if (getWorkingResult.length === 0) throw new HttpException(409, `working Hours Not available for ${accountID}`);
    return getWorkingResult;
  }

  public async findById(id: string): Promise<WorkingHours> {
    if (isEmpty(id)) throw new HttpException(400, 'Working hours Id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Working hours Id is invalid');

    const result: WorkingHours = await this.workingHours.findOne({ _id: id });
    if (!result) throw new HttpException(409, "Working hours doesn't exist");

    return result;
  }

  public async createWorkingHours( accountId:string, reqWorkingData: WorkingHoursDto): Promise<WorkingHours> {
    if (isEmpty(reqWorkingData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');

    const findWorkingHours: WorkingHours = await this.workingHours.findOne({ $and: [{ inboxes_id: reqWorkingData.inboxes_id, account_id: accountId }] });
    //console.log("service ==  > ",findcustomAttribute);
    if (findWorkingHours) throw new HttpException(409, `The working for inbox id: ${reqWorkingData.inboxes_id}  for account ${accountId} is already exists`);
    const createData={
      "account_id": accountId,
      "inboxes_id" : reqWorkingData.inboxes_id,
      
    };
    const createResult: WorkingHours = await this.workingHours.create(createData);
    return createResult;
  }

  public async update(id: string, accountID: string,requestData: WorkingHoursDto): Promise<WorkingHours> {

    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid');
    
    const updateResultById: WorkingHours = await this.workingHours.findByIdAndUpdate(id, { $set: requestData });
    if (!updateResultById) throw new HttpException(409, "Working hours doesn't exist");

    return updateResultById;
  }

  public async delete(id: string): Promise<WorkingHours> {
    const deleteResultById: WorkingHours = await this.workingHours.findByIdAndDelete(id);
    if (!deleteResultById) throw new HttpException(409, "Working hours doesn't exist");

    return deleteResultById;
  }
}

export default WorkingHoursService;
