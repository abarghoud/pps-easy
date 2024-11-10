import { IsDate, IsDateString, IsEmail, IsEnum, IsString, MaxDate, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

import { Gender } from '../../gender.enum';
import { DateTime } from 'luxon';

export class PPSProfileDto {
  @IsDateString()
  public birthday: string;

  @IsEmail()
  public email: string;

  @Type(() => Date)
  @IsDate()
  @MinDate(
    () => DateTime.now().toJSDate(),
    { message: 'event_date cannot be in the past' }
  )
  @MaxDate(
    () => DateTime.now().plus({ month: 3 }).toJSDate(),
    { message: 'event_date should be within 3 months' }
  )
  public event_date: Date;

  @IsString()
  public firstname: string;

  @IsEnum(Gender)
  public gender: Gender;

  @IsString()
  public lastname: string;
}
