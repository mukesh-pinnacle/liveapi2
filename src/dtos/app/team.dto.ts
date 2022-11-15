import { IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class TeamDto {
  @IsString()
  public account_id: ObjectId;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsNumber()
  public allow_auto_assign: number;
}
