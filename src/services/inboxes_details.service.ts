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
    if (!getAllInbox) throw new HttpException(409, "Custom Attribute not available");
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

  public async create(requestData: InboxesDetailsDto): Promise<InboxesDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');

    const createResult: InboxesDetails = await this.inboxesDetails.create(requestData);

    return createResult;
  }

  public async update(accountID: string, id: string, requestData: InboxesDetailsDto): Promise<InboxesDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');
    if (isEmpty(accountID)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'inbox detail ID is invalid');

  
    const updateResultById: InboxesDetails = await this.inboxesDetails.findByIdAndUpdate(id, { $set: requestData });
    if (!updateResultById) throw new HttpException(409, "InboxesDetails doesn't exist");

    return updateResultById;
  }

  public async delete(id: string): Promise<InboxesDetails> {
    const deleteResultById: InboxesDetails = await this.inboxesDetails.findByIdAndDelete(id);
    if (!deleteResultById) throw new HttpException(409, "InboxesDetails doesn't exist");

    return deleteResultById;
  }
}

export default InboxesDetailsService;
