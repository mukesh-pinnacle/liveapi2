import { IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class AvailabilityDto {

  @IsString()
  public account_id: String;
  @IsString()
  public signInSignOut_id: object;
  @IsNumber()
  public isAvailable: Number;
  
  
}
