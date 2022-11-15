import { NextFunction, Request, Response } from 'express';
import { TeamDto } from '@/dtos/app/team.dto';
import { Team } from '@/interfaces/app/team.interface';
import TeamService from '@services/team.service';

class TeamController {
  public teamService = new TeamService();
  //get All language
  public getTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTeamData: Team[] = await this.teamService.findAllTeam();
      res.status(200).json({ data: findAllTeamData, message: 'findAll', statusCode: 200 });
    } catch (error) {
      next(error);
    }
  };
  //get Teams by id
  public getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _Id: string = req.params.id;
      console.log('inside by id == ', _Id);

      const findOneTeamData: Team = await this.teamService.findTeamById(_Id);

      res.status(200).json({ data: findOneTeamData, message: 'findOne', statusCode: 200 });
    } catch (error) {
      next(error);
    }
  };
  // create language
  public createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const localeData: TeamDto = req.body;
      //console.log("Team Controller ==>",localeData)
      const createlocaleData: Team = await this.teamService.createTeam(localeData);
      res.status(201).json({ data: createlocaleData, message: 'created', statusCode: 201 });
    } catch (error) {
      next(error);
    }
  };
  //update language
  public updateTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const TeamId: any = req.params.id;
      const teamData: TeamDto = req.body;
      console.log('inside update  == ', teamData);
      const updateLocaleData: Team = await this.teamService.updateTeam(TeamId, teamData);
      res.status(200).json({ data: updateLocaleData, message: 'updated', statusCode: 200 });
    } catch (error) {
      next(error);
    }
  };
  //delete language
  public deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teamId: string = req.params.id;
      const isActive: number = parseInt(req.params.isActive);
      const deleteLocaleData: Team = await this.teamService.deleteTeam(teamId, isActive);
      console.log(teamId);
      res.status(200).json({ data: deleteLocaleData, message: 'deleted', statusCode: 200 });
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
