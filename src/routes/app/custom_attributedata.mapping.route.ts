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
        this.router.post(`${this.path}/accounts/:accountid/custom-attribute-map`, [validationMiddleware(CustomAttributeMappingDto, 'body', true),
            authMiddleware], this.customAttributeMappingController.createCustomAttrMapping);
        this.router.get(`${this.path}/accounts/:accountid/custom-attribute-map`, [validationMiddleware(CustomAttributeMappingDto, 'body', true),
            authMiddleware], this.customAttributeMappingController.getCustomAttributMappingByAccountId);
        this.router.get(`${this.path}/accounts/:accountid/custom-attribute-map/:id`, [validationMiddleware(CustomAttributeMappingDto, 'body', true),
            authMiddleware], this.customAttributeMappingController.getCustomAttributMapById);
         this.router.put(`${this.path}/accounts/:accountid/custom-attribute-map/:id`, [validationMiddleware(CustomAttributeMappingDto, 'body', true), 
         authMiddleware], this.customAttributeMappingController.updateCustomAttributeMapping);
        this.router.delete(`${this.path}/accounts/:accountid/custom-attribute-map/:id`, [validationMiddleware(CustomAttributeMappingDto, 'body', true),
         authMiddleware], this.customAttributeMappingController.deleteCustomAttributeMap);
    }
}

export default CustomAttributeMappingRoute;