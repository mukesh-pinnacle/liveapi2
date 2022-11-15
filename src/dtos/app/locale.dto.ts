import { IsString, IsNumber, IsDateString } from 'class-validator';

export class LocaleDto {
    @IsString()
    public lng: string;
    @IsNumber()
    public is_active: number;
    @IsDateString()
     public created_at: Date;
     public updated_at: Date;

}
