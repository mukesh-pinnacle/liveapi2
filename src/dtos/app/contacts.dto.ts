import { IsEmail, IsString, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public phone_number: string;

  @IsString()
  @IsOptional()
  public account_id: string;

  @IsString()
  @IsOptional()
  public pubsub_token: string;

  @IsObject()
  @IsOptional()
  public additional_attributes: Object;

  @IsString()
  @IsOptional()
  public identifier: string;

  @IsObject()
  @IsOptional()
  public custom_attributes: Object;

  @IsString()
  @IsOptional()
  public file_name: string;

  @IsString()
  @IsOptional()
  public file_url: string;
}
