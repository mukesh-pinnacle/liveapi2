import { hash } from 'bcrypt';
import { CreateSuperadminDto } from '@/dtos/super_admin/superadmin.dto';
import { HttpException } from '@exceptions/HttpException';
import { Superadmin } from '@/interfaces/super_admin/superadmin.interface';
import subSuperAdminDetailModel from '@/models/super_admin/subsuperadmin_details.model';
import { isEmpty } from '@utils/util';
import { SubSuperAdminSetailsDto } from '@/dtos/super_admin/subsuperadmin_details.dto';
import { SubSuperAdminDetailsInt } from '@/interfaces/super_admin/subsuperadmindetails.interface';
import superadminModel from '@/models/super_admin/superadmin.model';
import { CreateSubSuperAdmin } from '@/dtos/super_admin/createSubSuperAdmin.dto';

class SubSuperAdminDetailsService {
  public subSuperAdminDetailModel = subSuperAdminDetailModel;
  public superadminModel=superadminModel;

//   public async findAllSuperadmin(): Promise<Superadmin[]> {
//     const superadmin: Superadmin[] = await this.superadmin.find();
//     return superadmin;
//   }

//   public async findSuperadminById(superadminId: string): Promise<Superadmin> {
//     if (isEmpty(superadminId)) throw new HttpException(400, 'Superadmin is empty');

//     const findSuperadmin: Superadmin = await this.superadmin.findOne({ _id: superadminId });
//     if (!findSuperadmin) throw new HttpException(409, "Superadmin doesn't exist");

//     return findSuperadmin;
//   }

  public async createSuperadmin(subsuperadminData: CreateSubSuperAdmin): Promise<any> {
    if (isEmpty(subsuperadminData)) throw new HttpException(400, 'Sub SuperAdmin details is empty');
    const findSuperadmin: Superadmin = await this.superadminModel.findOne({ email: { $regex: new RegExp(subsuperadminData.email, 'i') } });
    if (findSuperadmin) throw new HttpException(409, `This email ${subsuperadminData.email} already exists`);
    if (subsuperadminData.displayname !== '') {
      const findSuperadmindisplayname: Superadmin = await this.superadminModel.findOne({
        displayname: { $regex: new RegExp(subsuperadminData.displayname, 'i') },
      });
      if (findSuperadmindisplayname) throw new HttpException(409, `This display name ${subsuperadminData.displayname} already exists`);
    }
    const hashedPassword = await hash(subsuperadminData.password, 10);
    const createSuperadminData: Superadmin = await this.superadminModel.create({ ...subsuperadminData, password: hashedPassword });
    console.log(createSuperadminData._id);
    
     const findsubSuperadmindetail: SubSuperAdminDetailsInt = await this.subSuperAdminDetailModel.findOne({ company_name: { $regex: new RegExp(subsuperadminData.company_name, 'i') } });
     if (findsubSuperadmindetail) throw new HttpException(409, `This Company Name ${subsuperadminData.company_name} already exists`);
     const createDetails={
      "superAdmin_id":createSuperadminData._id,
      ...subsuperadminData
     };
     console.log("here==>",createDetails);
     
     const createsubsuperadmindetails:SubSuperAdminDetailsInt=await this.subSuperAdminDetailModel.create({...subsuperadminData, "superAdmin_id":createSuperadminData._id });
     return createsubsuperadmindetails;

  }

//   public async updateSuperadmin(superadminId: string, superadminData: CreateSuperadminDto): Promise<Superadmin> {
//     if (isEmpty(superadminData)) throw new HttpException(400, 'superadminData is empty');

//     if (superadminData.name) {
//       const findSuperadmin: Superadmin = await this.superadmin.findOne({ name: superadminData.name });
//       if (findSuperadmin && findSuperadmin._id != superadminId) throw new HttpException(409, `This name ${superadminData.name} already exists`);
//     }

//     const updateSuperadminById: Superadmin = await this.superadmin.findByIdAndUpdate(
//       superadminId,
//       { $set: superadminData },
//       { new: true, runValidators: true },
//     );
//     if (!updateSuperadminById) throw new HttpException(409, "Superadmin doesn't exist");
//     const updateSuperadmin: Superadmin = await this.superadmin.findByIdAndUpdate(
//       superadminId,
//       { $set: { updated_at: Date.now() } },
//       { new: true, runValidators: true },
//     );
//     return updateSuperadmin;
//   }

//   public async deleteSuperadmin(superadminId: string, isActive: number): Promise<Superadmin> {
//     const deleteSuperadminById: Superadmin = await this.superadmin.findByIdAndUpdate(
//       superadminId,
//       { $set: { is_active: isActive, updated_at: Date.now() } },
//       { new: true, runValidators: true },
//     );
//     if (!deleteSuperadminById) throw new HttpException(409, "Superadmin doesn't exist");
//     return deleteSuperadminById;
//   }
}

export default SubSuperAdminDetailsService;
