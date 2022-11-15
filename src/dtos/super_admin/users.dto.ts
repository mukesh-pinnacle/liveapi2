import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
  @IsString()
  public name: string;
  @IsString()
  public displayname: string;

  // @IsNumber()
  // public isActive: number;

  // @IsDateString()
  // public created_at: Date;

  // @IsDate()
  // public modified_at: Date;
}
