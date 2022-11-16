import { Router } from 'express';
import LocaleController from '@controllers/app/locale.controller';
import { LocaleDto } from '@dtos/app/locale.dto';
import { Routes } from '@interfaces/routes.interface';
//import validationLocalMiddleware from '@middlewares/validate_locale.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import appMiddleware from '@/middlewares/app.middleware';



class LocaleRoute implements Routes {
  public path = '/app/locale';
  public router: Router = Router();
  public localeController = new LocaleController();

  constructor() {
    this.initializeRoutes();
    console.log("hello from routes");
  }

  private initializeRoutes() {
    
    this.router.get(`${this.path}`, [validationMiddleware(LocaleDto, 'body', true), authMiddleware], this.localeController.getLocale);
    this.router.get(`${this.path}/:id`, [validationMiddleware(LocaleDto, 'body', true), authMiddleware], this.localeController.getLocaleById);
   //this.router.post(`${this.path}`, validationMiddleware(LocaleDto, 'body'), authMiddleware, this.localeController.createLocale);
   // this.router.put(`${this.path}/:id`, [validationMiddleware(LocaleDto, 'body', true), authMiddleware], this.localeController.updateLocale);
   // this.router.delete(`${this.path}/:id/:isActive`, [validationMiddleware(LocaleDto, 'body', true), authMiddleware], this.localeController.deleteLocale);
  }
}

export default LocaleRoute;
