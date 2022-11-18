import { IsString, IsNumber, IsDateString, IsBoolean, IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CustomAttributeMappingDto {
    
    @IsString()
    public custom_attribute_id: ObjectId;
    @IsString()
    public account_id: ObjectId;
    @IsString()
    public contact_id: ObjectId;
    @IsString()
    public conversation_id: ObjectId;

    

}
