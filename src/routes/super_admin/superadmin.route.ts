import { Router } from 'express';
import SuperadminController from '@/controllers/super_admin/superadmin.controller';
import { CreateSuperadminDto } from '@/dtos/super_admin/superadmin.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import superadminAuthMiddleware from '@/middlewares/superadminAuth.middleware';

class SuperadminRoute implements Routes {
  public path = '/super_admin/superadmin';
  public router = Router();
  public SuperadminController = new SuperadminController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, superadminAuthMiddleware, this.SuperadminController.getSuperadmin);
    this.router.get(`${this.path}/:id`, superadminAuthMiddleware, this.SuperadminController.getSuperadminById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateSuperadminDto, 'body'),
      superadminAuthMiddleware,
      this.SuperadminController.createSuperadmin,
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateSuperadminDto, 'body', true),
      superadminAuthMiddleware,
      this.SuperadminController.updateSuperadmin,
    );
    this.router.get(`${this.path}/:id/:isActive`, superadminAuthMiddleware, this.SuperadminController.deleteSuperadmin);
  }
}
export default SuperadminRoute;
