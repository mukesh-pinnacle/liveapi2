import {IsString, IsNumber, IsBoolean } from 'class-validator';

export class InboxesDetailsDto {

  @IsString()
  public inboxes_id: String;

  @IsString()
  public account_id: String;

  @IsBoolean()
  public enable_auto_assignment: Boolean;

  @IsBoolean()
  public greeting_enabled: Boolean;

  @IsString()
  public greeting_message: String;

  @IsString()
  public email_address: String;

  @IsBoolean()
  public working_hours_enabled: Boolean;

  @IsString()
  public out_of_office_message: String;

  @IsString()
  public timezone: String;

  @IsBoolean()
  public csat_survey_enabled: Boolean;

  @IsBoolean()
  public allow_messages_after_resolved: Boolean;

}
