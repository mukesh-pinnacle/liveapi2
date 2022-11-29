import { Router } from 'express';
import AvailabilityController from '@controllers/app/availability.controller';
import { AvailabilityDto } from '@dtos/app/availability.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import validateObjectId from '@/middlewares/validate_id.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class AvailabilityRoute implements Routes {
    public path = '/app';
    public router: Router = Router();
    public controller = new AvailabilityController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/accounts/:accountid/availability`, [validationMiddleware(AvailabilityDto, 'body', true), authMiddleware],
            this.controller.create);
        // this.router.put(`${this.path}/accounts/:accountid/availability/:id`, [validationMiddleware(AvailabilityDto, 'body', true), authMiddleware],
        //     this.controller.update);
        this.router.get(`${this.path}/accounts/:accountid/availability`, [validationMiddleware(AvailabilityDto, 'body', true), authMiddleware],
            this.controller.getAll);
        this.router.get(`${this.path}/accounts/:accountid/availability/:id`, [validationMiddleware(AvailabilityDto, 'body', true), authMiddleware],
            this.controller.getOneById);
    }
}

export default AvailabilityRoute;
