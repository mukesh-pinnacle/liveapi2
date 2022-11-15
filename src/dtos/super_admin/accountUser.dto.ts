import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateAccountUserDto {
  @IsString()
  public account_id: ObjectId;

  @IsString()
  public user_id: ObjectId;

  @IsString()
  public role: ObjectId;
}
