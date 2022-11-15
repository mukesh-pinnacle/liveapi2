import { IsString, IsNumber, IsDateString, IsBoolean, IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';

export class NoteDto {
    @IsString()
    public account_id: ObjectId;

    @IsString()
    public user_id: string;

    @IsString()
    public contact_id: string;

    @IsString()
    public content: string;


    @IsDateString()
    public created_at: Date;
    public updated_at: Date;

}