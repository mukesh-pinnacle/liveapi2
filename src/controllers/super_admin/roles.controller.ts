import { NextFunction, Request, Response } from 'express';
import { Role } from '@interfaces/super_admin/roles.interface';
import { CreateRoleDto } from '@dtos/super_admin/roles.dto';
import RolesService from '@services/roles.service';

class RolesController {
  public roleService = new RolesService();

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRolesData: Role[] = await this.roleService.findAllRole();

      res.status(200).json({ data: findAllRolesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;

      const findOneRoleData: Role = await this.roleService.findRoleById(roleId);

      res.status(200).json({ data: findOneRoleData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleData: CreateRoleDto = req.body;
      const createRoleData: Role = await this.roleService.createRole(roleData);
      res.status(201).json({ data: createRoleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const roleData: CreateRoleDto = req.body;
      const updateRoleData: Role = await this.roleService.updateRole(roleId, roleData);

      res.status(200).json({ data: updateRoleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const isActive: number = parseInt(req.params.isActive);
      const deleteRoleData: Role = await this.roleService.deleteRole(roleId, isActive);

      res.status(200).json({ data: deleteRoleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RolesController;
