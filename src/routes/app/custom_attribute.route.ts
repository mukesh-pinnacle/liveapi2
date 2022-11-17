import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware'
import authMiddleware from '@/middlewares/auth.middleware';
import { CustomAttributeDto } from '@/dtos/app/custom_attribute.dto';
import CustomAttributeController from '@controllers/app/custom_attribute.controller';

class CustomRoute implements Routes {
    public path = '/app';
    public router: Router = Router();
    public customAttributeController = new CustomAttributeController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}/accounts/:accountid/custom-attribute`, [validationMiddleware(CustomAttributeDto, 'body', true), authMiddleware], this.customAttributeController.createCustomAttribute);
        this.router.get(`${this.path}/accounts/:accountid/custom-attribute`, [validationMiddleware(CustomAttributeDto, 'body', true), authMiddleware], this.customAttributeController.getCustomAttributByAccountId);
         this.router.get(`${this.path}/accounts/:accountid/custom-attribute/:id`, [validationMiddleware(CustomAttributeDto, 'body', true), authMiddleware], this.customAttributeController.getCustomAttributById);
        this.router.put(`${this.path}/accounts/:accountid/custom-attribute/:id`, [validationMiddleware(CustomAttributeDto, 'body', true), authMiddleware], this.customAttributeController.updateCustomAttribute);
        // this.router.delete(`${this.path}/accounts/:accountid/label/:id`, [validationMiddleware(CustomAttributeDto, 'body', true), authMiddleware], this.customAttributeController.delete);
    }
}

export default CustomRoute;