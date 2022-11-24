import { IsString, IsNumber, IsDateString } from 'class-validator';

export class MessageDto {
    
    @IsNumber()
    public is_active: number;
    @IsString()
    public account_id: Object;
    @IsString()
    public inbox_id: Object;
    @IsString()
    public conversation_id: Object;
    @IsString()
    public chat_assign_Id: Object;
    @IsNumber()
    public message_type: Number;
    @IsString()
    public content: Number;
    @IsString()
    public media_path: String;
    @IsNumber()
    public is_private: Number;
    @IsNumber()
    public content_type: Number;
    @IsNumber()
    public sender_type: Number;
    @IsString()
    sender_id: Object;
    @IsDateString()
    public created_at: Date;
    public updated_at: Date;

}
