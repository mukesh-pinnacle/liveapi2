import { Router } from 'express';
import Controller from '@controllers/app/inboxes_shift_details.controller';
import { InboxesShiftDetailsDto } from '@dtos/app/inboxes_shift_details.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import validateObjectId from '@/middlewares/validate_id.middleware';
import { ValidatePromise } from 'class-validator';
import authMiddleware from '@/middlewares/auth.middleware';

class InboxesShiftDetailsRoute implements Routes {
  public path = '/app';
  public router: Router = Router();
  public controller = new Controller();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/accounts/:accountid/inboxes-shift-details`,[validationMiddleware(InboxesShiftDetailsDto, 'body', true), authMiddleware], this.controller.getAll);
    this.router.get(`${this.path}/accounts/:accountid/inboxes-shift-details/:id`,[validationMiddleware(InboxesShiftDetailsDto, 'body', true), authMiddleware], this.controller.getOneById);
    this.router.post(`${this.path}/accounts/:accountid/inboxes-shift-details`, [validationMiddleware(InboxesShiftDetailsDto, 'body', true), authMiddleware], this.controller.create);
    this.router.put(`${this.path}/accounts/:accountid/inboxes-shift-details/:id`, [validationMiddleware(InboxesShiftDetailsDto, 'body', true), authMiddleware], this.controller.update);
    this.router.delete(`${this.path}/accounts/:accountid/inboxes-shift-details/:id`, [validationMiddleware(InboxesShiftDetailsDto, 'body', true), authMiddleware], this.controller.delete);
  }
}

export default InboxesShiftDetailsRoute;
