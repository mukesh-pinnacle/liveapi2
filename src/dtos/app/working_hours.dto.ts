import {IsString, IsNumber, IsBoolean } from 'class-validator';

export class WorkingHoursDto {

  @IsString()
  public inboxes_details_id: String;

  @IsString()
  public inboxes_shift_id: String;

  @IsString()
  public account_id: String;


}
