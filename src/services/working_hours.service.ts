import { WorkingHoursDto } from '@dtos/app/working_hours.dto';
import { HttpException } from '@exceptions/HttpException';
import { WorkingHours } from '@interfaces/app/working_hours.interface';
import workingHoursModel from '@models/app/working_hours.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class WorkingHoursService {
  public workingHours = workingHoursModel;

  public async findAllWorkingHours(accountID: string): Promise<WorkingHours[]> {
    if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid');
    const getWorkingResult: WorkingHours[] = await this.workingHours.find({ account_id: accountID }).sort({ _id: -1 });
    if (getWorkingResult.length === 0) throw new HttpException(409, `working Hours Not available for ${accountID}`);
    return getWorkingResult;
  }

  public async findWorkingHoursById(accountID: string, id: string): Promise<WorkingHours> {
    if (isEmpty(id)) throw new HttpException(400, 'Working hours Id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Working hours Id is invalid');
    if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid')
    const result: WorkingHours = await this.workingHours.findOne({ _id: id, account_id: accountID });
    if (!result) throw new HttpException(409, "Working hours doesn't exist");

    return result;
  }

  public async createWorkingHours(accountId: string, reqWorkingData: WorkingHoursDto): Promise<WorkingHours> {
    if (isEmpty(reqWorkingData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');

    const findWorkingHours: WorkingHours = await this.workingHours.findOne({ $and: [{ inboxes_id: reqWorkingData.inboxes_id, account_id: accountId, inbox_shift_id:reqWorkingData.inbox_shift_id }] });
    //console.log("service ==  > ",findcustomAttribute);
    if (findWorkingHours) throw new HttpException(409, `The working for Inbox ID: ${reqWorkingData.inboxes_id}  for account ${accountId} is already exists`);
    const createData = {
      "account_id": accountId,
      "inboxes_id": reqWorkingData.inboxes_id,
      "inbox_shift_id": reqWorkingData.inbox_shift_id,
      "day_of_week": reqWorkingData.day_of_week,
      "closed_all_day": reqWorkingData.closed_all_day,
      "open_hour": reqWorkingData.open_hour,
      "open_minutes": reqWorkingData.open_minutes,
      "close_hour": reqWorkingData.close_hour,
      "closed_minutes": reqWorkingData.closed_minutes
    };
    const createResult: WorkingHours = await this.workingHours.create(createData);
    return createResult;
  }

  public async updateWorkingHours(id: string, accountID: string, requestData: WorkingHoursDto): Promise<WorkingHours> {

    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid');
    if (isEmpty(id)) throw new HttpException(400, 'Working hours Id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Working hours Id is invalid');
    const updateResultById: WorkingHours = await this.workingHours.findByIdAndUpdate({ _id: id, account_id: accountID },
      { $set: requestData, updated_at: Date.now() }, { new: true, runValidators: true });
    if (!updateResultById) throw new HttpException(409, "Working hours doesn't exist");

    return updateResultById;
  }

  public async deleteWorkingHours(accountID:string, id: string): Promise<WorkingHours> {
    if (isEmpty(id)) throw new HttpException(400, 'Working hours Id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Working hours Id is invalid');
    if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account Id is invalid');
    const deleteResultById: WorkingHours = await this.workingHours.findByIdAndDelete({ _id: id });
    if (!deleteResultById) throw new HttpException(409, "Working hours doesn't exist");

    return deleteResultById;
  }
}

export default WorkingHoursService;
