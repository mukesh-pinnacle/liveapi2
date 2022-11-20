import {IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class InboxesShiftDetailsDto {

  @IsString()
  public inboxes_details_id: String;

  @IsString()
  public account_id: String;

  @IsString()
  public inboxes_shift_id: String;

  @IsString()
  public shift_type: String;

  @IsString()
  public name: String;

  @IsString()
  public description: String;

  @IsDateString()
  public to_time: String;

  @IsDateString()
  public from_time: String;

  @IsNumber()
  public is_active: Number;

}
