import { Router } from 'express';
import TeamController from '@/controllers/app/team.controller';
import { TeamDto } from '@/dtos/app/team.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
class TeamRoute implements Routes {
  public path = '/app/team';
  public router: Router = Router();
  public teamController = new TeamController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, [validationMiddleware(TeamDto, 'body', true)], authMiddleware, this.teamController.getTeam);
    this.router.get(`${this.path}/:id`, [validationMiddleware(TeamDto, 'body', true)], authMiddleware, this.teamController.getTeamById);
    this.router.post(`${this.path}`, [validationMiddleware(TeamDto, 'body', true)], authMiddleware, this.teamController.createTeam);
    this.router.put(`${this.path}/:id`, [validationMiddleware(TeamDto, 'body', true)], authMiddleware, this.teamController.updateTeam);
    this.router.get(`${this.path}/:id/:isActive`, [validationMiddleware(TeamDto, 'body', true)], authMiddleware, this.teamController.deleteTeam);
  }
}
export default TeamRoute;
