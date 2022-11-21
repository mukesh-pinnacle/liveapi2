import { InboxesDto } from '@dtos/app/inboxes.dto';
import { HttpException } from '@exceptions/HttpException';
import { Inboxes } from '@interfaces/app/inboxes.interface';
import inboxesModel from '@models/app/inboxes.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class InboxesService {
  public inboxes = inboxesModel;

  public async findAllInboxes(accountId: string): Promise<Inboxes[]> {
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    const inboxes: Inboxes[] = await this.inboxes.find({ account_id: accountId }).sort({ _id: -1 });
    //console.log(inboxes);
    if (inboxes.length === 0) throw new HttpException(409, `Inbox not available for ${accountId}`);
    return inboxes;
  }

  public async findInboxById(inboxId: string, accountId: string): Promise<Inboxes> {
    if (isEmpty(inboxId)) throw new HttpException(400, 'Inboxes Id is empty');
    if (!Types.ObjectId.isValid(inboxId)) throw new HttpException(400, 'Inboxes Id is invalid');
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');

    const findInbox: Inboxes = await this.inboxes.findOne({ _id: inboxId, account_id: accountId });
    if (!findInbox) throw new HttpException(409, "Inboxes doesn't exist");

    return findInbox;
  }

  public async createInbox(accountId: string, inboxData: InboxesDto): Promise<Inboxes> {
    if (isEmpty(inboxData)) throw new HttpException(400, 'inboxData is empty');
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    const findInbox: Inboxes = await this.inboxes.findOne({ $and: [{ name: { $regex: new RegExp(inboxData.name, "i") }, account_id: accountId }] });
    if (findInbox) throw new HttpException(409, `This name ${inboxData.name}for account ${accountId} is already exists`);
    const createInboxData = {
      "account_id": accountId,
      "name": inboxData.name,
      "channel_type_id": inboxData.channel_type_id,
      "is_active": 1
    };
    const createinboxData: Inboxes = await this.inboxes.create(inboxData);

    return createinboxData;
  }

  public async updateInbox(inboxId: string, accountId: string, inboxData: InboxesDto): Promise<Inboxes> {
    if (isEmpty(inboxData)) throw new HttpException(400, 'inboxData is empty');
    if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
    if (!Types.ObjectId.isValid(inboxId)) throw new HttpException(400, 'Inboxes Id is invalid');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    if (inboxData.name) {
      const findInbox: Inboxes = await this.inboxes.findOne({ name: { $regex: new RegExp(inboxData.name, "i") }, account_id: accountId });
      if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
      if (findInbox && findInbox._id.toString() != inboxId) throw new HttpException(409, `This name ${inboxData.name} already exists for account ${accountId}`);
    }

    const updateInboxById: Inboxes = await this.inboxes.findByIdAndUpdate({ _id: inboxId, account_id: accountId },
      { $set: inboxData, updated_at: Date.now() }, { new: true, runValidators: true });
    if (!updateInboxById) throw new HttpException(409, "Inboxes doesn't exist");

    return updateInboxById;
  }

  public async deleteInbox(inboxId: string, accountId: string): Promise<Inboxes> {
    const deleteInboxById: Inboxes = await this.inboxes.findOneAndUpdate(
      { $and: [{ _id: inboxId }, { account_id: accountId }] },
      { $set: { is_active: 0, updated_at: Date.now() } },
      { new: true, runValidators: true }
    );
    if (!deleteInboxById) throw new HttpException(409, "Inboxes doesn't exist");

    return deleteInboxById;
  }
}

export default InboxesService;
