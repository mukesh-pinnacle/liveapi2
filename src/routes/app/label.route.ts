import { Router } from 'express';
import LabelController from '@controllers/app/label.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware'
import authMiddleware from '@/middlewares/auth.middleware';
import { LabelDto } from '@/dtos/app/label.dto';


class LabelRoute implements Routes {
    public path = '/app';
    public router: Router = Router();
    public labelController = new LabelController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
         this.router.post(`${this.path}/accounts/:accountid/label`, [validationMiddleware(LabelDto, 'body', true), authMiddleware], this.labelController.createLabel);
        this.router.get(`${this.path}/accounts/:accountid/label/:id`, [validationMiddleware(LabelDto, 'body', true), authMiddleware], this.labelController.getLabel);
        this.router.get(`${this.path}/accounts/:accountid/label`, [validationMiddleware(LabelDto, 'body', true), authMiddleware], this.labelController.getLabelBYAccountId);
        this.router.put(`${this.path}/accounts/:accountid/label/:id`, [validationMiddleware(LabelDto, 'body', true), authMiddleware], this.labelController.updateLabel);
        this.router.delete(`${this.path}/accounts/:accountid/label/:id`, [validationMiddleware(LabelDto, 'body', true), authMiddleware], this.labelController.delete);
    }
}

export default LabelRoute;