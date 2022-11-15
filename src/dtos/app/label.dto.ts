import { IsString, IsNumber, IsDateString, IsBoolean, IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';

export class LabelDto {
    @IsString()
    public account_id: ObjectId;

    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsString()
    public color: string;

    @IsBoolean()
    public show_on_sid: boolean;

    @IsDateString()
    public created_at: Date;
    public updated_at: Date;

}