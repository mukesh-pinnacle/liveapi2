import { TeamMemberDto } from '@/dtos/app/TeamMemberDto';
import { TeamMember } from '@/interfaces/app/team_member.interface';
import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import TeamMemberModel from '@/models/app/team_member.model';
import { ObjectId, Types } from 'mongoose';

class TeamMemberService {
  public teamMemberModel = TeamMemberModel;

  // find All record
  public async findAllTeamMembers(): Promise<TeamMember[]> {
    const team: TeamMember[] = await this.teamMemberModel.find();
    return team;
  }
  //find by id
  public async findTeamMemById(_Id: string): Promise<TeamMember> {
    console.log(_Id);

    if (isEmpty(_Id)) throw new HttpException(400, 'Team Id is empty');
    if (!Types.ObjectId.isValid(_Id)) throw new HttpException(400, 'Team Member Id is invalid');

    const findTeamMem: TeamMember = await this.teamMemberModel.findOne({ _id: _Id });
    if (!findTeamMem) throw new HttpException(409, "Team doesn't exist");

    return findTeamMem;
  }
  // //create record
  public async createTeamMember(teamMemData: TeamMemberDto): Promise<TeamMember> {
    console.log('Team Services', teamMemData);
    if (isEmpty(teamMemData)) throw new HttpException(400, 'Team Data is empty');
    const findteam: TeamMember = await this.teamMemberModel.findOne({ account_user_id: teamMemData.account_user_id, team_id: teamMemData.team_id });
    console.log('findteam == ' + JSON.stringify(findteam));

    if (findteam)
      throw new HttpException(
        409,
        `The Team Member already present for the Account user : ${teamMemData.account_user_id} and team  ${teamMemData.team_id}`,
      );
    const createTeamMemData: TeamMember = await this.teamMemberModel.create(teamMemData);
    return createTeamMemData;
  }
  //update record
  public async updateTeamMember(teamMemId: string, teamMemData: TeamMemberDto): Promise<TeamMember> {
    if (isEmpty(teamMemId)) throw new HttpException(400, 'Team Data is empty');
    if (!Types.ObjectId.isValid(teamMemId)) throw new HttpException(400, 'Team Member Id is invalid');
    console.log('inside update Team Member service===', teamMemId);
    if (teamMemId) {
      const findMemteam: TeamMember = await this.teamMemberModel.findOne({ team_id: teamMemData.team_id });
      if (findMemteam && findMemteam._id != teamMemId) throw new HttpException(409, `This ${teamMemData.team_id} already exists`);
      // find other object id which have same team member
    }
    const updateTeamMemById: TeamMember = await this.teamMemberModel.findByIdAndUpdate(
      teamMemId,
      { $set: teamMemData, updated_at: Date.now() },
      { new: true, runValidators: true },
    );
    console.log(updateTeamMemById);
    if (!updateTeamMemById) throw new HttpException(409, "Team Member doesn't exist");
    return updateTeamMemById;
  }
  // deleted record
  public async deleteTeamMem(teamMemId: string, isActive: number): Promise<TeamMember> {
    if (!Types.ObjectId.isValid(teamMemId)) throw new HttpException(400, 'Team Id is invalid');
    console.log(teamMemId);
    const deleteTeamMemById: TeamMember = await this.teamMemberModel.findByIdAndUpdate(
      teamMemId,
      { $set: { is_active: isActive, updated_at: Date.now() } },
      { new: true, runValidators: true },
    );
    console.log(deleteTeamMemById);
    //findOneAndDelete(localeId);
    if (!deleteTeamMemById) throw new HttpException(409, "Team Member doesn't exist");
    return deleteTeamMemById;
  }
}

export default TeamMemberService;
