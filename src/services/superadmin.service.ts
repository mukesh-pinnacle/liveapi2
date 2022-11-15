import { hash } from 'bcrypt';
import { CreateSuperadminDto } from '@/dtos/super_admin/superadmin.dto';
import { HttpException } from '@exceptions/HttpException';
import { Superadmin } from '@/interfaces/super_admin/superadmin.interface';
import superadminModel from '@/models/super_admin/superadmin.model';
import { isEmpty } from '@utils/util';

class SuperadminService {
  public superadmin = superadminModel;

  public async findAllSuperadmin(): Promise<Superadmin[]> {
    const superadmin: Superadmin[] = await this.superadmin.find();
    return superadmin;
  }

  public async findSuperadminById(superadminId: string): Promise<Superadmin> {
    if (isEmpty(superadminId)) throw new HttpException(400, 'Superadmin is empty');

    const findSuperadmin: Superadmin = await this.superadmin.findOne({ _id: superadminId });
    if (!findSuperadmin) throw new HttpException(409, "Superadmin doesn't exist");

    return findSuperadmin;
  }

  public async createSuperadmin(superadminData: CreateSuperadminDto): Promise<Superadmin> {
    if (isEmpty(superadminData)) throw new HttpException(400, 'superadminData is empty');
    const findSuperadmin: Superadmin = await this.superadmin.findOne({ email: { $regex: new RegExp(superadminData.email, 'i') } });
    if (findSuperadmin) throw new HttpException(409, `This email ${superadminData.email} already exists`);

    if (superadminData.displayname !== '') {
      const findSuperadmindisplayname: Superadmin = await this.superadmin.findOne({
        displayname: { $regex: new RegExp(superadminData.displayname, 'i') },
      });
      if (findSuperadmindisplayname) throw new HttpException(409, `This display name ${superadminData.displayname} already exists`);
    }

    const hashedPassword = await hash(superadminData.password, 10);
    const createSuperadminData: Superadmin = await this.superadmin.create({ ...superadminData, password: hashedPassword });

    return createSuperadminData;
  }

  public async updateSuperadmin(superadminId: string, superadminData: CreateSuperadminDto): Promise<Superadmin> {
    if (isEmpty(superadminData)) throw new HttpException(400, 'superadminData is empty');

    if (superadminData.name) {
      const findSuperadmin: Superadmin = await this.superadmin.findOne({ name: superadminData.name });
      if (findSuperadmin && findSuperadmin._id != superadminId) throw new HttpException(409, `This name ${superadminData.name} already exists`);
    }

    const updateSuperadminById: Superadmin = await this.superadmin.findByIdAndUpdate(
      superadminId,
      { $set: superadminData },
      { new: true, runValidators: true },
    );
    if (!updateSuperadminById) throw new HttpException(409, "Superadmin doesn't exist");
    const updateSuperadmin: Superadmin = await this.superadmin.findByIdAndUpdate(
      superadminId,
      { $set: { updated_at: Date.now() } },
      { new: true, runValidators: true },
    );
    return updateSuperadmin;
  }

  public async deleteSuperadmin(superadminId: string, isActive: number): Promise<Superadmin> {
    const deleteSuperadminById: Superadmin = await this.superadmin.findByIdAndUpdate(
      superadminId,
      { $set: { is_active: isActive, updated_at: Date.now() } },
      { new: true, runValidators: true },
    );
    if (!deleteSuperadminById) throw new HttpException(409, "Superadmin doesn't exist");
    return deleteSuperadminById;
  }
}

export default SuperadminService;
