import { IsString, IsNumber, IsDateString, IsBoolean, IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CannedResponsesDto {
    @IsString()
    public account_id: ObjectId;
    
    @IsString()
    public short_code: string;

    @IsString()
    public content: string;

    @IsDateString()
    public created_at: Date;
    public updated_at: Date;

}
