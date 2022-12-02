import { Router } from 'express';
import AuthController from '@controllers/superadminAuth.controller';
import { signInSuperadminDto } from '@/dtos/super_admin/signInSuperadmin.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/superadminAuth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class SuperAdminAuth implements Routes {
  public path = '/super_admin/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(signInSuperadminDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default SuperAdminAuth;
