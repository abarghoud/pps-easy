import { IsDateString, IsEmail, IsEnum, IsString } from 'class-validator';

import { Gender } from '../../gender.enum';

export class PPSProfileDto {
  @IsDateString()
  public birthday: string;

  @IsEmail()
  public email: string;

  @IsDateString()
  public event_date: string;

  @IsString()
  public firstname: string;

  @IsEnum(Gender)
  public gender: Gender;

  @IsString()
  public lastname: string;
}
