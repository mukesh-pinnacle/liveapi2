import { IsString, IsNumber, IsDateString, IsBoolean, IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CustomAttributeMappingDto {
    
    @IsString()
    public custom_attribute_id: ObjectId;
    @IsString()
    public account_id: ObjectId;
    @IsString()
    public mapping_id: ObjectId;
    @IsNumber()
    public is_active: number;

    @IsDateString()
    public created_at: Date;
    @IsDateString()
    public updated_at: Date;
}
