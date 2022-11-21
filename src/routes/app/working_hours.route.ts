import { Router } from 'express';
import WorkingHoursController from '@controllers/app/working_hours.controller';
import { WorkingHoursDto } from '@dtos/app/working_hours.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import validateObjectId from '@/middlewares/validate_id.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class WorkingHoursRoute implements Routes {
  public path = '/app';
  public router: Router = Router();
  public controller = new WorkingHoursController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/accounts/:accountid/working-hours`, [validationMiddleware(WorkingHoursDto, 'body', true), authMiddleware],
      this.controller.getAll);
    this.router.get(`${this.path}/accounts/:accountid/working-hours/:id`, [validationMiddleware(WorkingHoursDto, 'body', true), authMiddleware],
      this.controller.getOneById);
    this.router.post(`${this.path}/accounts/:accountid/working-hours`, [validationMiddleware(WorkingHoursDto, 'body', true), authMiddleware],
      this.controller.create);
    this.router.put(`${this.path}/accounts/:accountid/working-hours/:id`, [validationMiddleware(WorkingHoursDto, 'body', true), authMiddleware],
      this.controller.update);
    this.router.delete(`${this.path}/accounts/:accountid/working-hours/:id`, [validationMiddleware(WorkingHoursDto, 'body', true), authMiddleware],
      this.controller.delete);
  }
}

export default WorkingHoursRoute;
