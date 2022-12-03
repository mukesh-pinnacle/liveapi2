import { IsEmail, IsNumber, IsString, IsDateString, IsBase64} from 'class-validator';
export class CreateSubSuperAdmin {
  @IsString()
  public company_name: string;
  @IsString()
  public business_description: string;
  @IsNumber()
  public mobile_name: string;
  @IsEmail()
  public superAdmin_id: object;
  @IsString()
  public branch: string;
  @IsString()
  public remark: string;
  @IsDateString()
  public created_at: Date;
  public updated_at: Date;
  @IsString()
  public logo: String;
  @IsString()
  public name: string;
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
  @IsString()
  public displayname: string;
  @IsNumber()
  public is_Active: number;
  @IsNumber()
  public is_subsuperAdmin: number;
  
}

