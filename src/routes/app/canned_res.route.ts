import { Router } from 'express';
import CannedResController from '@controllers/canned_res.controller';
import { CannedResponsesDto } from '@dtos/CannedResponses.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware'
import authMiddleware from '@/middlewares/auth.middleware';



class CannedResRoute implements Routes {
    public path = '/canned-reponses';
    public router: Router = Router();
    public cannedResController = new CannedResController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:accountId`, [validationMiddleware(CannedResponsesDto, 'body', true), authMiddleware], this.cannedResController.getCannedResByAcID);
        this.router.get(`${this.path}/:accountId/:shortcode`, [validationMiddleware(CannedResponsesDto, 'body', true), authMiddleware], this.cannedResController.getCannedRespByShort_code);
        this.router.post(`${this.path}`, [validationMiddleware(CannedResponsesDto, 'body', true), authMiddleware], this.cannedResController.createCannedResp);
         this.router.put(`${this.path}/:accountId/:id`, [validationMiddleware(CannedResponsesDto, 'body', true), authMiddleware], this.cannedResController.updateCannedResp);
        this.router.delete(`${this.path}/:accountId/:id`, [validationMiddleware(CannedResponsesDto, 'body', true), authMiddleware], this.cannedResController.deleteCannedRes);
    }
}

export default CannedResRoute;
