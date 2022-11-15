import { CreateRoleDto } from '@dtos/super_admin/roles.dto';
import { HttpException } from '@exceptions/HttpException';
import { Role } from '@interfaces//super_admin/roles.interface';
import RolesModel from '@models/super_admin/roles.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class RolesService {
  public roles = RolesModel;

  public async findAllRole(): Promise<Role[]> {
    const roles: Role[] = await this.roles.find();
    return roles;
  }

  public async findRoleById(roleId: string): Promise<Role> {
    if (isEmpty(roleId)) throw new HttpException(400, 'Role Id is empty');
    if (!Types.ObjectId.isValid(roleId)) throw new HttpException(400, 'Role Id is invalid');

    const findRole: Role = await this.roles.findOne({ _id: roleId });
    if (!findRole) throw new HttpException(409, "Role doesn't exist");

    return findRole;
  }

  public async createRole(roleData: CreateRoleDto): Promise<Role> {
    if (isEmpty(roleData)) throw new HttpException(400, 'roleData is empty');

    const findAccount: Role = await this.roles.findOne({ role: { $regex: new RegExp(roleData.role, 'i') } });
    if (findAccount) throw new HttpException(409, `This name ${roleData.role} already exists`);

    const createRoleData: Role = await this.roles.create(roleData);

    return createRoleData;
  }

  public async updateRole(roleId: string, roleData: CreateRoleDto): Promise<Role> {
    if (isEmpty(roleData)) throw new HttpException(400, 'roleData is empty');
    if (roleData.role) {
      const findRole: Role = await this.roles.findOne({ role: roleData.role });
      if (findRole && findRole._id.toString() != roleId) throw new HttpException(409, `This name ${roleData.role} already exists`);
    }
    const updateRoleById: Role = await this.roles.findByIdAndUpdate(
      roleId,
      { $set: roleData, updated_at: Date.now() },
      { new: true, runValidators: true },
    );
    if (!updateRoleById) throw new HttpException(409, "Role doesn't exist");
    return updateRoleById;
  }

  public async deleteRole(roleId: string, isActive: number): Promise<Role> {
    const deleteRoleById: Role = await this.roles.findByIdAndUpdate(
      roleId,
      { $set: { is_active: isActive, updated_at: Date.now() } },
      { new: true, runValidators: true },
    );
    if (!deleteRoleById) throw new HttpException(409, "Role doesn't exist");
    return deleteRoleById;
  }
}
export default RolesService;
