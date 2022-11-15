import { Router } from 'express';
import RolesController from '@controllers/super_admin/roles.controller';
import { CreateRoleDto } from '@dtos/super_admin/roles.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import superadminAuthMiddleware from '@/middlewares/superadminAuth.middleware';

class RolesRoute implements Routes {
  public path = '/super_admin/roles';
  public router: Router = Router();
  public rolesController = new RolesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.rolesController.getRoles);
    this.router.get(`${this.path}/:id`, superadminAuthMiddleware, this.rolesController.getRoleById);
    this.router.post(`${this.path}`, validationMiddleware(CreateRoleDto, 'body'), superadminAuthMiddleware, this.rolesController.createRole);
    this.router.put(`${this.path}/:id`, superadminAuthMiddleware, this.rolesController.updateRole);
    this.router.get(`${this.path}/:id/:isActive`, superadminAuthMiddleware, this.rolesController.deleteRole);
  }
}

export default RolesRoute;
