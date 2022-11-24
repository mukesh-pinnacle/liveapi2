import { Router } from 'express';
import CsatSurveyResponsesController from '@controllers/app/csat_survey_responses.controller';
import { CsatSurveyResponsesDto } from '@dtos/app/csat_survey_responses.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class CsatSurveyResponsesRoute implements Routes {
  public path = '/app';
  public router: Router = Router();
  public controller = new CsatSurveyResponsesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/accounts/:accountid/csat_survey_responses`, [validationMiddleware(CsatSurveyResponsesDto, 'body', true), authMiddleware],
      this.controller.getAll);
    this.router.get(`${this.path}/accounts/:accountid/csat_survey_responses/:id`, [validationMiddleware(CsatSurveyResponsesDto, 'body', true), authMiddleware],
      this.controller.getOneById);
    this.router.post(`${this.path}/accounts/:accountid/csat_survey_responses`, [validationMiddleware(CsatSurveyResponsesDto, 'body', true), authMiddleware],
      this.controller.create);
    this.router.put(`${this.path}/accounts/:accountid/csat_survey_responses/:id`, [validationMiddleware(CsatSurveyResponsesDto, 'body', true), authMiddleware],
      this.controller.update);
    this.router.delete(`${this.path}/accounts/:accountid/csat_survey_responsess/:id`, [validationMiddleware(CsatSurveyResponsesDto, 'body', true), authMiddleware],
      this.controller.delete);
  }
}

export default CsatSurveyResponsesRoute;
