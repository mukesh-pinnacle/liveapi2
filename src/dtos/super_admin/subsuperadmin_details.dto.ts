import { IsEmail, IsNumber, IsString, IsDateString, IsBase64} from 'class-validator';
export class SubSuperAdminSetailsDto {
  @IsString()
  public company_name: string;
  @IsString()
  public business_description: string;
  @IsString()
  public contact_email: string;
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
}

