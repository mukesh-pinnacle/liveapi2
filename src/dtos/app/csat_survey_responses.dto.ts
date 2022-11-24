import {IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CsatSurveyResponsesDto  {

  @IsString()
  public conversation_id: String;

  @IsString()
  public account_id: String;

  @IsString()
  public message_id: String;

  @IsNumber()
  public rating: Number;

  @IsString()
  public feedback_message: string;

  @IsString()
  public contact_id: String;

  @IsString()
  public assigned_agent_id: String;

}
