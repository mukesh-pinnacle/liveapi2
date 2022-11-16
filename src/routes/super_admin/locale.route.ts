import { Router } from 'express';
import LocaleController from '@/controllers/app/locale.controller';
import { LocaleDto } from '@/dtos/app/locale.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import superadminAuthMiddleware from '@/middlewares/superadminAuth.middleware';

class LocaleRoute implements Routes {
  public path = '/super_admin/locale';
  public router: Router = Router();
  public localeController = new LocaleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, superadminAuthMiddleware, this.localeController.getLocale);
    this.router.get(`${this.path}/:id`, superadminAuthMiddleware, this.localeController.getLocaleById);
    this.router.post(`${this.path}`, validationMiddleware(LocaleDto, 'body'), superadminAuthMiddleware, this.localeController.createLocale);
    this.router.put(
      `${this.path}/:id`,
      [validationMiddleware(LocaleDto, 'body', true)],
      superadminAuthMiddleware,
      this.localeController.updateLocale,
    );
    this.router.get(`${this.path}/:id/:isActive`, superadminAuthMiddleware, this.localeController.deleteLocale);
  }
}

export default LocaleRoute;
