import { IsEmail, IsString } from 'class-validator';
export class signInSuperadminDto {
  @IsString()
  public name: string;
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
  @IsString()
  public displayname: string;
}
