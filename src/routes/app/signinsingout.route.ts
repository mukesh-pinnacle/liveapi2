import { Router } from 'express';
import SigninSignoutController from '@controllers/app/signinsignout.controller';
import { SigninSignoutDto } from '@dtos/app/signinsignout.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import validateObjectId from '@/middlewares/validate_id.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class SigninSignoutRoute implements Routes {
    public path = '/app';
    public router: Router = Router();
    public controller = new SigninSignoutController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/accounts/:accountid/signinsignout`, [validationMiddleware(SigninSignoutDto, 'body', true), authMiddleware],
            this.controller.create);
        this.router.put(`${this.path}/accounts/:accountid/signinsignout/:id`, [validationMiddleware(SigninSignoutDto, 'body', true), authMiddleware],
            this.controller.update);
        this.router.get(`${this.path}/accounts/:accountid/signinsignout`, [validationMiddleware(SigninSignoutDto, 'body', true), authMiddleware],
            this.controller.getAll);
        this.router.get(`${this.path}/accounts/:accountid/signinsignout/:id`, [validationMiddleware(SigninSignoutDto, 'body', true), authMiddleware],
            this.controller.getOneById);
    }
}

export default SigninSignoutRoute;
