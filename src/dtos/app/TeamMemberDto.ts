import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class TeamMemberDto {
  @IsString()
  public account_user_id: ObjectId;

  @IsString()
  public team_id: ObjectId;
}
