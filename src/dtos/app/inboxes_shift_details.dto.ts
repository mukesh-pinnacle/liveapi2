import {IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class InboxesShiftDetailsDto {

  @IsString()
  public inboxes_id: String;

  @IsString()
  public account_id: String;

  @IsString()
  public inboxes_shift_id: String;

  @IsString()
  public shift_type: String;

  @IsString()
  public name: string;

  @IsString()
  public description: String;

  @IsString()
  public to_time: String;

  @IsString()
  public from_time: String;

  @IsNumber()
  public is_active: Number;

}
