import { InboxesShiftDetailsDto } from '@dtos/app/inboxes_shift_details.dto';
import { HttpException } from '@exceptions/HttpException';
import { InboxesShiftDetails } from '@interfaces/app/inboxes_shift_details.interface';
import inboxesShiftDetailsModel from '@models/app/inboxes_shift_details.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class InboxesShiftDetailsService {
  public inboxesShiftDetails = inboxesShiftDetailsModel;

  public async findAll(): Promise<InboxesShiftDetails[]> {
    return await this.inboxesShiftDetails.find();
  }

  public async findById(id: string): Promise<InboxesShiftDetails> {
    if (isEmpty(id)) throw new HttpException(400, 'Inbox shift details Id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Shift details Id is invalid');

    const result: InboxesShiftDetails = await this.inboxesShiftDetails.findOne({ _id: id });
    if (!result) throw new HttpException(409, "Inbox shift details doesn't exist");

    return result;
  }

  public async createInboxShiftDetails(accountId: string, requestData: InboxesShiftDetailsDto): Promise<InboxesShiftDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(accountId)) throw new HttpException(400, 'Account Id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    const findOneShift: InboxesShiftDetails = await this.inboxesShiftDetails.findOne({ accountId: accountId, inboxes_id: requestData.inboxes_id });
    if (findOneShift) throw new HttpException(409, `This inbox id ${ requestData.inboxes_id} for account ${accountId} is already exists`);
    const createData = {
      inboxes_id: requestData.inboxes_id,
      account_id: accountId,
      shift_type: requestData.shift_type,
      name: requestData.name,
      description: requestData.description,
      to_time: requestData.to_time,
      from_time: requestData.from_time,
      is_active: requestData.is_active
    };
    const createResult: InboxesShiftDetails = await this.inboxesShiftDetails.create(createData);

    return createResult;
  }

  public async update(id: string, requestData: InboxesShiftDetailsDto): Promise<InboxesShiftDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');

    const updateResultById: InboxesShiftDetails = await this.inboxesShiftDetails.findByIdAndUpdate(id, { $set: requestData });
    if (!updateResultById) throw new HttpException(409, "Inbox shift details doesn't exist");

    return updateResultById;
  }

  public async delete(id: string): Promise<InboxesShiftDetails> {
    const deleteResultById: InboxesShiftDetails = await this.inboxesShiftDetails.findByIdAndDelete(id);
    if (!deleteResultById) throw new HttpException(409, "Inbox shift details doesn't exist");

    return deleteResultById;
  }
}

export default InboxesShiftDetailsService;
