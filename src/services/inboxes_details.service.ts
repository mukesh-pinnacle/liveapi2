import { InboxesDetailsDto } from '@dtos/app/inboxes_details.dto';
import { HttpException } from '@exceptions/HttpException';
import { InboxesDetails } from '@interfaces/app/inboxes_details.interface';
import inboxesDetailsModel from '@models/app/inboxes_details.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class InboxesDetailsService {
  public inboxesDetails = inboxesDetailsModel;

  public async findAll(): Promise<InboxesDetails[]> {
    return await this.inboxesDetails.find();
  }

  public async findById(id: string): Promise<InboxesDetails> {
    if (isEmpty(id)) throw new HttpException(400, 'InboxesDetails Id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'InboxesDetails Id is invalid');

    const result: InboxesDetails = await this.inboxesDetails.findOne({ _id: id });
    if (!result) throw new HttpException(409, "InboxesDetails doesn't exist");

    return result;
  }

  public async create(requestData: InboxesDetailsDto): Promise<InboxesDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');

    const createResult: InboxesDetails = await this.inboxesDetails.create(requestData);

    return createResult;
  }

  public async update(id: string, requestData: InboxesDetailsDto): Promise<InboxesDetails> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');

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
