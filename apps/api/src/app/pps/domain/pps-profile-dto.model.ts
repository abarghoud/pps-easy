import { IsDate, IsEmail, IsEnum, IsString, MaxDate, MinDate } from 'class-validator';
import { Type } from 'class-transformer';
import { DateTime } from 'luxon';

import { Gender } from '@pps-easy/user/domain';

export class PPSProfileDto {
  @Type(() => Date)
  @IsDate()
  @MaxDate(
    () => DateTime.now().minus({ year: 18 }).toJSDate(),
    { message: 'You must be greater that 18 years old' }
  )
  public birthday: Date;

  @IsEmail()
  public email: string;

  @Type(() => Date)
  @IsDate()
  @MinDate(
    () => DateTime.now().startOf('day').toJSDate(),
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
