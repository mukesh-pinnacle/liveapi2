import { InboxesDto } from '@dtos/app/inboxes.dto';
import { HttpException } from '@exceptions/HttpException';
import { Inboxes } from '@interfaces/app/inboxes.interface';
import inboxesModel from '@models/app/inboxes.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class InboxesService {
  public inboxes = inboxesModel;

  public async findAllInboxes(): Promise<Inboxes[]> {
    const inboxes: Inboxes[] = await this.inboxes.find();
    return inboxes;
  }

  public async findInboxById(inboxId: string): Promise<Inboxes> {
    if (isEmpty(inboxId)) throw new HttpException(400, 'Inboxes Id is empty');
    if (!Types.ObjectId.isValid(inboxId)) throw new HttpException(400, 'Inboxes Id is invalid');

    const findInbox: Inboxes = await this.inboxes.findOne({ _id: inboxId });
    if (!findInbox) throw new HttpException(409, "Inboxes doesn't exist");

    return findInbox;
  }

  public async createInbox(inboxData: InboxesDto): Promise<Inboxes> {
    if (isEmpty(inboxData)) throw new HttpException(400, 'inboxData is empty');

    const findInbox: Inboxes = await this.inboxes.findOne({ name: inboxData.name });
    if (findInbox) throw new HttpException(409, `This name ${inboxData.name} already exists`);

    const createinboxData: Inboxes = await this.inboxes.create(inboxData);

    return createinboxData;
  }

  public async updateInbox(inboxId: string, inboxData: InboxesDto): Promise<Inboxes> {
    if (isEmpty(inboxData)) throw new HttpException(400, 'inboxData is empty');

    if (inboxData.name) {
      const findInbox: Inboxes = await this.inboxes.findOne({ name: inboxData.name });
      if (findInbox && findInbox._id.toString() != inboxId) throw new HttpException(409, `This name ${inboxData.name} already exists`);
    }

    const updateInboxById: Inboxes = await this.inboxes.findByIdAndUpdate(inboxId, { $set: inboxData });
    if (!updateInboxById) throw new HttpException(409, "Inboxes doesn't exist");

    return updateInboxById;
  }

  public async deleteInbox(inboxId: string): Promise<Inboxes> {
    const deleteInboxById: Inboxes = await this.inboxes.findByIdAndDelete(inboxId);
    if (!deleteInboxById) throw new HttpException(409, "Inboxes doesn't exist");

    return deleteInboxById;
  }
}

export default InboxesService;
