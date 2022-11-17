import { IsString, IsNumber, IsDateString, IsBoolean, IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CustomAttributeDto {
    @IsString()
    public display_name: string;
    @IsString()
    public key: string;
    @IsString()
    public account_id: ObjectId;
    @IsString()
    public description: string;

    @IsNumber()
    public display_type: number;
    @IsNumber()
    public mode: number;
    @IsNumber()
    public is_active: number;

    @IsDateString()
    public created_at: Date;
    @IsDateString()
    public updated_at: Date;

}
