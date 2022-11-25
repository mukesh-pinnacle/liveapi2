import {IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class ChatAssignDto {

    @IsString()
    public conversation_id: String;
    @IsString()
    public account_id: String;
    @IsNumber()
    public is_team: Number;
    @IsString()
    public team_id: String;
    @IsString()
    public assignee_id : String;
    @IsNumber()
    public is_active_chat: Number;
}