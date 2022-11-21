import { InboxesDetailsDto } from '@dtos/app/inboxes_details.dto';
import { HttpException } from '@exceptions/HttpException';
import { InboxesDetails } from '@interfaces/app/inboxes_details.interface';
import inboxesDetailsModel from '@models/app/inboxes_details.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class InboxesDetailsService {
  public inboxesDetails = inboxesDetailsModel;

  public async findAll(accountId: string): Promise<InboxesDetails[]> {
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    const getAllInbox: InboxesDetails[] = await this.inboxesDetails.find({ account_id: accountId }).sort({ _id: -1 });
    if (!getAllInbox) throw new HttpException(409, "Inbox Details not available");
    return getAllInbox;
  }

  public async findById(id: string, accountId: string): Promise<InboxesDetails> {
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (isEmpty(id)) throw new HttpException(400, 'inbox id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'InboxesDetails Id is invalid');
    const inboxesDetails: InboxesDetails = await this.inboxesDetails.findOne({ account_id: accountId, _id: id });
    if (!inboxesDetails) throw new HttpException(409, "Inbox details not available");
    return inboxesDetails;
  }

  public async createInboxDetails(accountId: string, requestData: InboxesDetailsDto): Promise<InboxesDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    const findinboxDetail: InboxesDetails = await this.inboxesDetails.findOne({ $and: [{ inboxes_id: requestData.inboxes_id, account_id: accountId }] });
    //console.log("service ==  > ",findcustomAttribute);
    if (findinboxDetail) throw new HttpException(409, `The inbox details for inbox id: ${requestData.inboxes_id}  for account ${accountId} is already exists`);
    const createData = {
      "inboxes_id": requestData.inboxes_id,
      "account_id": accountId,
      "enable_auto_assignment": requestData.enable_auto_assignment,
      "greeting_enabled": requestData.greeting_enabled,
      "greeting_message": requestData.greeting_message,
      "email_address": requestData.email_address,
      "working_hours_enabled": requestData.working_hours_enabled,
      "out_of_office_message": requestData.out_of_office_message,
      "timezone": requestData.timezone,
      "csat_survey_enabled": requestData.csat_survey_enabled,
      "allow_messages_after_resolved": requestData.allow_messages_after_resolved
    };
    const createResult: InboxesDetails = await this.inboxesDetails.create(createData);
    return createResult;
  }

  public async update(accountID: string, inboxdetailid: string, requestData: InboxesDetailsDto): Promise<InboxesDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
    if (isEmpty(inboxdetailid)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(inboxdetailid)) throw new HttpException(400, 'inbox detail ID is invalid');
    if (!Types.ObjectId.isValid(accountID)) throw new HttpException(400, 'Account ID is invalid');
    const updateResultById: InboxesDetails = await this.inboxesDetails.findOneAndUpdate({ _id: inboxdetailid, account_id: accountID }, 
      { $set: requestData, updated_at: Date.now()}, { new: true, runValidators: true });
    if (!updateResultById) throw new HttpException(409, "InboxesDetails doesn't exist");
    return updateResultById;
  }

  // public async delete(id: string): Promise<InboxesDetails> {
  //   const deleteResultById: InboxesDetails = await this.inboxesDetails.findByIdAndDelete(id);
  //   if (!deleteResultById) throw new HttpException(409, "InboxesDetails doesn't exist");

  //   return deleteResultById;
  // }
}

export default InboxesDetailsService;
