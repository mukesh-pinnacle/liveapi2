import { InboxesShiftDetailsDto } from '@dtos/app/inboxes_shift_details.dto';
import { HttpException } from '@exceptions/HttpException';
import { InboxesShiftDetails } from '@interfaces/app/inboxes_shift_details.interface';
import inboxesShiftDetailsModel from '@models/app/inboxes_shift_details.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class InboxesShiftDetailsService {
  public inboxesShiftDetails = inboxesShiftDetailsModel;

  public async findAllInboxShiftDetails(accountId: string): Promise<InboxesShiftDetails[]> {
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    const inboxes_shift: InboxesShiftDetails[] = await this.inboxesShiftDetails.find({ account_id: accountId }).sort({ _id: -1 });
    return inboxes_shift;
  }

  public async findInboxShiftDetailsById(accountId: string, id: string): Promise<InboxesShiftDetails> {
    if (isEmpty(id)) throw new HttpException(400, 'Inbox shift details Id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Shift details Id is invalid');
    if (isEmpty(accountId)) throw new HttpException(400, 'Account Id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    const result: InboxesShiftDetails = await this.inboxesShiftDetails.findOne({ _id: id, account_id: accountId });
    if (!result) throw new HttpException(409, "Inbox shift details doesn't exist");

    return result;
  }

  public async createInboxShiftDetails(accountId: string, requestData: InboxesShiftDetailsDto): Promise<InboxesShiftDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(accountId)) throw new HttpException(400, 'Account Id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    const findOneShift: InboxesShiftDetails = await this.inboxesShiftDetails.findOne({ accountId: accountId, name: requestData.name });
     if (findOneShift) throw new HttpException(409, `This inbox shift name ${ requestData.name} for account ${accountId} is already exists`);
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

  public async updateInboxShiftDetails(accountid: string, id: string, requestData: InboxesShiftDetailsDto): Promise<InboxesShiftDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(id)) throw new HttpException(400, 'Inbox Shift id is empty');
    if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Inboxes shift Id is invalid');
    if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
    if (requestData.name) {
      const findInboxshift: InboxesShiftDetails = await this.inboxesShiftDetails.findOne({ name: { $regex: new RegExp(requestData.name, "i") }, account_id: accountid });
      if (findInboxshift && findInboxshift._id.toString() != id) throw new HttpException(409, `This name ${requestData.name} already exists for account ${accountid}`);
    }
    const updateResultById: InboxesShiftDetails = await this.inboxesShiftDetails.findByIdAndUpdate(id,
      { $set: requestData, updated_at: Date.now() },
      { new: true, runValidators: true });
    if (!updateResultById) throw new HttpException(409, "Inbox shift details doesn't exist");

    return updateResultById;
  }

  public async deleteInboxShiftDetails(accountid: string, id: string): Promise<InboxesShiftDetails> {
    const deleteInboxshiftById: InboxesShiftDetails = await this.inboxesShiftDetails.findOneAndUpdate(
      { $and: [{ _id: id }, { account_id: accountid }] },
      { $set: { is_active: 0, updated_at: Date.now() } },
      { new: true, runValidators: true }
    );
    if (!deleteInboxshiftById) throw new HttpException(409, "Inbox shift details doesn't exist");
    return deleteInboxshiftById;
  }
}

export default InboxesShiftDetailsService;
