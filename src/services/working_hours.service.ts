import { WorkingHoursDto } from '@dtos/working_hours.dto';
import { HttpException } from '@exceptions/HttpException';
import { WorkingHours } from '@interfaces/working_hours.interface';
import workingHoursModel from '@models/working_hours.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class WorkingHoursService {
  public workingHours = workingHoursModel;

  public async findAll(): Promise<WorkingHours[]> {
    return await this.workingHours.find();
  }

  public async findById(id: string): Promise<WorkingHours> {
    if (isEmpty(id)) throw new HttpException(400, 'Working hours Id is empty');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Working hours Id is invalid');

    const result: WorkingHours = await this.workingHours.findOne({ _id: id });
    if (!result) throw new HttpException(409, "Working hours doesn't exist");

    return result;
  }

  public async create(requestData: WorkingHoursDto): Promise<WorkingHours> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');

    const createResult: WorkingHours = await this.workingHours.create(requestData);

    return createResult;
  }

  public async update(id: string, requestData: WorkingHoursDto): Promise<WorkingHours> {
    if (isEmpty(requestData)) throw new HttpException(400, 'request data is empty');

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
