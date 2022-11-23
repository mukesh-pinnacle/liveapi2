import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class WorkingHoursDto {

  @IsString()
  public account_id: String;
  @IsString()
  public inboxes_id: object;
  @IsNumber()
  public day_of_week: Number;
  @IsNumber()
  public closed_all_day: Number;
  @IsNumber()
  public open_hour: Number;
  @IsNumber()
  public open_minutes: Number;
  @IsNumber()
  public close_hour: Number;
  @IsNumber()
  public closed_minutes: Number;
}
