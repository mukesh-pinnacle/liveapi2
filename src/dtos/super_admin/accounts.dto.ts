import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateAccountDto {
  @IsString()
  public name: string;

  @IsString()
  public domain: string;

  @IsEmail()
  public support_email: string;

  @IsString()
  public locale_id: ObjectId;

  @IsNumber()
  public auto_resolve_duration: number;

  @IsNumber()
  public limits: number;

  // @IsNumber()
  // public is_active: number;

  // @IsDateString()
  // public created_at: Date;
}
