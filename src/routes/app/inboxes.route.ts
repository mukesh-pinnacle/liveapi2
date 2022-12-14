import { Router } from 'express';
import InboxesController from '@controllers/app/inboxes.controller';
import { InboxesDto } from '@dtos/app/inboxes.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import validateObjectId from '@/middlewares/validate_id.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class InboxesRoute implements Routes {
  public path = '/app';
  public router: Router = Router();
  public controller = new InboxesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/accounts/:accountid/inboxes`, this.controller.getAll);
    this.router.get(`${this.path}/accounts/:accountid/inboxes/:id`, [validationMiddleware(InboxesDto, 'body', true), authMiddleware], this.controller.getOneById);
    this.router.post(`${this.path}/accounts/:accountid/inboxes`, [validationMiddleware(InboxesDto, 'body', true), authMiddleware], this.controller.create);
    this.router.put(`${this.path}/accounts/:accountid/inboxes/:id`, [validateObjectId, validationMiddleware(InboxesDto, 'body', true)], this.controller.update);
    this.router.delete(`${this.path}/accounts/:accountid/inboxes/:id`, [validateObjectId, validationMiddleware(InboxesDto, 'body', true)], this.controller.delete);
  }
}

export default InboxesRoute;
