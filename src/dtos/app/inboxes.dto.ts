import {IsString, IsNumber, IsBoolean } from 'class-validator';

export class InboxesDto {

  @IsString()
  public channel_type_id: string;

  @IsString()
  public account_id: string;

  @IsString()
  public name: string;

  @IsNumber()
  public is_active: Number;

}
