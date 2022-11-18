import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware'
import authMiddleware from '@/middlewares/auth.middleware';
import { CustomAttributeMappingDto } from '@/dtos/app/custom_attributeMapping.dto';
import CustomAttributeMappingController from '@/controllers/app/custom_attributeMapping.controller';

class CustomAttributeMappingRoute implements Routes {
    public path = '/app';
    public router: Router = Router();
    public customAttributeMappingController = new CustomAttributeMappingController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
         this.router.post(`${this.path}/accounts/:accountid/custom-attribute-data`,
          [validationMiddleware(CustomAttributeMappingDto, 'body', true), authMiddleware], 
          this.customAttributeMappingController.createCustomAttrMapping);
        // this.router.get(`${this.path}/accounts/:accountid/custom-attribute`, [validationMiddleware(CustomAttributeDto, 'body', true), authMiddleware], this.customAttributeDataController.getCustomAttributByAccountId);
        //  this.router.get(`${this.path}/accounts/:accountid/custom-attribute/:id`, [validationMiddleware(CustomAttributeDto, 'body', true), authMiddleware], this.customAttributeDataController.getCustomAttributById);
        // this.router.put(`${this.path}/accounts/:accountid/custom-attribute/:id`, [validationMiddleware(CustomAttributeDto, 'body', true), authMiddleware], this.customAttributeDataController.updateCustomAttribute);
        // this.router.delete(`${this.path}/accounts/:accountid/custom-attribute/:id`, [validationMiddleware(CustomAttributeDto, 'body', true), authMiddleware], this.customAttributeDataController.deleteCustomAttribute);
    }
}

export default CustomAttributeMappingRoute;