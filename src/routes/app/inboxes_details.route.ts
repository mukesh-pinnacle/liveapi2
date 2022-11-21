import { Router } from 'express';
import InboxesDetailsController from '@controllers/app/inboxes_details.controller';
import { InboxesDetailsDto } from '@dtos/app/inboxes_details.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import validateObjectId from '@/middlewares/validate_id.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class InboxesDetailsRoute implements Routes {
  public path = '/app';
  public router: Router = Router();
  public controller = new InboxesDetailsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/accounts/:accountid/inboxes-details`, [validationMiddleware(InboxesDetailsDto, 'body', true), authMiddleware], this.controller.getAll);
    this.router.get(`${this.path}/accounts/:accountid/inboxes-details/:id`,[validationMiddleware(InboxesDetailsDto, 'body', true), authMiddleware], this.controller.getOneById);
    this.router.post(`${this.path}/accounts/:accountid/inboxes-details`, [validationMiddleware(InboxesDetailsDto, 'body', true), authMiddleware], this.controller.create);
    this.router.put(`${this.path}/accounts/:accountid/inboxes-details/:id`, [validateObjectId, validationMiddleware(InboxesDetailsDto, 'body', true)], this.controller.update);
    //this.router.delete(`${this.path}/accounts/:accountid/inboxes-details/:id`,[validationMiddleware(InboxesDetailsDto, 'body', true), authMiddleware], this.controller.delete);
  }
}

export default InboxesDetailsRoute;
