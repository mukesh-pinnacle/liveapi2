import { IsString } from 'class-validator';

export class LocaleDto {
  @IsString()
  public lng: string;
}
