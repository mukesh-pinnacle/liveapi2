import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class SigninSignoutDto {

  @IsString()
  public account_id: String;
  @IsString()
  public user_id: object;
}
