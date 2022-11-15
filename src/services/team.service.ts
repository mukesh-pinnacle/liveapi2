import { TeamDto } from '@/dtos/app/team.dto';
import { Team } from '@/interfaces/app/team.interface';
import { HttpException } from '@exceptions/HttpException';
import TeamModel from '@/models/app/team.model';
import { isEmpty } from '@utils/util';
import { ObjectId, Types } from 'mongoose';
//import { Types } from 'mongoose';

class TeamService {
  public teamModel = TeamModel;
  // find All record
  public async findAllTeam(): Promise<Team[]> {
    const team: Team[] = await this.teamModel.find();
    return team;
  }
  //find by id
  public async findTeamById(_Id: string): Promise<Team> {
    if (isEmpty(_Id)) throw new HttpException(400, 'Team Id is empty');
    if (!Types.ObjectId.isValid(_Id)) throw new HttpException(400, 'Team Id is invalid');

    const findLocale: Team = await this.teamModel.findOne({ _id: _Id });
    if (!findLocale) throw new HttpException(409, "Team doesn't exist");

    return findLocale;
  }
  //create record
  public async createTeam(teamData: TeamDto): Promise<Team> {
    console.log('Team Services', teamData);
    if (isEmpty(teamData)) throw new HttpException(400, 'Team Data is empty');
    const findteam: Team = await this.teamModel.findOne({ name: { $regex: new RegExp(teamData.name, 'i') }, account_id: teamData.account_id });
    if (findteam) throw new HttpException(409, `The Team Name :  ${teamData.name}  for account ${teamData.account_id} is already exists`);
    const createTeamData: Team = await this.teamModel.create(teamData);
    return createTeamData;
  }
  //update record
  public async updateTeam(teamId: string, teamData: TeamDto): Promise<Team> {
    if (isEmpty(teamData)) throw new HttpException(400, 'Team Data is empty');
    if (!Types.ObjectId.isValid(teamId)) throw new HttpException(400, 'Team Id is invalid');
    console.log('inside update service===', teamId);
    if (teamId) {
      const findteam: Team = await this.teamModel.findOne({ name: teamData.name });
      if (findteam && findteam._id != teamId) throw new HttpException(409, `This ${teamData.name} already exists`);
      // find other object id which have languge
    }
    const updateTeamById: Team = await this.teamModel.findByIdAndUpdate(
      teamId,
      { $set: teamData, updated_at: Date.now() },
      { new: true, runValidators: true },
    );
    console.log(updateTeamById);
    if (!updateTeamById) throw new HttpException(409, "Team doesn't exist");
    return updateTeamById;
  }
  // deleted record
  public async deleteTeam(teamId: string, isActive: number): Promise<Team> {
    if (!Types.ObjectId.isValid(teamId)) throw new HttpException(400, 'Team Id is invalid');
    console.log(teamId);
    const deleteTeamById: Team = await this.teamModel.findByIdAndUpdate(
      teamId,
      { $set: { is_active: isActive, updated_at: Date.now() } },
      { new: true, runValidators: true },
    );
    console.log(deleteTeamById);

    //findOneAndDelete(localeId);
    if (!deleteTeamById) throw new HttpException(409, "Team doesn't exist");
    return deleteTeamById;
  }
}

export default TeamService;
