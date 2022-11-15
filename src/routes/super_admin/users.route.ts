import { Router } from 'express';
import UsersController from '@/controllers/super_admin/users.controller';
import { CreateUserDto } from '@/dtos/super_admin/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import superadminAuthMiddleware from '@/middlewares/superadminAuth.middleware';

class UsersRoute implements Routes {
  public path = '/super_admin/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, superadminAuthMiddleware, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, superadminAuthMiddleware, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), superadminAuthMiddleware, this.usersController.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), superadminAuthMiddleware, this.usersController.updateUser);
    this.router.get(`${this.path}/:id/:isActive`, superadminAuthMiddleware, this.usersController.deleteUser);
  }
}

export default UsersRoute;
