import {IsString, IsNumber, IsBoolean } from 'class-validator';

export class WorkingHoursDto {

  @IsString()
  public  account_id: String;
  
  @IsString()
  public inboxes_id: object;

  @IsString()
  public inboxes_shift_id: String;

}
