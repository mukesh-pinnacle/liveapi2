import { Router } from 'express';
import SubSuperAdminDetailController from '@controllers/super_admin/subsuperadmindetail.controller';
import { SubSuperAdminSetailsDto } from '@/dtos/super_admin/subsuperadmin_details.dto';
import { Routes } from '@interfaces/routes.interface';
import superadminAuthMiddleware from '@middlewares/superadminAuth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class subSuperAdmin implements Routes {
  public path = '/super_admin/subsuperadmin';
  public router = Router();
  public Controller = new SubSuperAdminDetailController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}`, [validationMiddleware(SubSuperAdminSetailsDto, 'body'), superadminAuthMiddleware],
    //   this.Controller.getLocale);
    this.router.get(`${this.path}/:id`, [validationMiddleware(SubSuperAdminSetailsDto, 'body'), superadminAuthMiddleware],
      this.Controller.getDetailsById);
    this.router.post(`${this.path}`, superadminAuthMiddleware, this.Controller.createSubSuperAdmin);
    this.router.put(`${this.path}/:id` , superadminAuthMiddleware,
      this.Controller.updatesubSuperdetails);
    this.router.delete(`${this.path}/:id/:isActive`, [validationMiddleware(SubSuperAdminSetailsDto, 'body'), superadminAuthMiddleware],
      this.Controller.delete);
  }
}

export default subSuperAdmin;
