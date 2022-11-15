import { Router } from 'express';
import TeamMemberController from '@/controllers/app/team_members.controller';
import { TeamMemberDto } from '@/dtos/app/TeamMemberDto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class TeamMemberRoute implements Routes {
  public path = '/app/team_members';
  public router: Router = Router();
  public teamMemberController = new TeamMemberController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [validationMiddleware(TeamMemberDto, 'body', true)], authMiddleware, this.teamMemberController.getAllTeamMember);
    this.router.get(
      `${this.path}/:id`,
      [validationMiddleware(TeamMemberDto, 'body', true)],
      authMiddleware,
      this.teamMemberController.getTeamMemberById,
    );
    this.router.post(`${this.path}`, [validationMiddleware(TeamMemberDto, 'body', true)], authMiddleware, this.teamMemberController.createTeamMember);
    this.router.put(
      `${this.path}/:id`,
      [validationMiddleware(TeamMemberDto, 'body', true)],
      authMiddleware,
      this.teamMemberController.updateTeamMember,
    );
    this.router.get(
      `${this.path}/:id/:isActive`,
      [validationMiddleware(TeamMemberDto, 'body', true)],
      authMiddleware,
      this.teamMemberController.deleteTeamMem,
    );
  }
}
export default TeamMemberRoute;
