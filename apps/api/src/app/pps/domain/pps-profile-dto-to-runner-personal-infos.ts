import { PPSProfileDto } from './pps-profile-dto.model';
import { Gender } from '../../gender.enum';
import { DateTime } from 'luxon';

export class PPSProfileDTOToRunnerPersonalInfos {
  public readonly birthdayDay: number;
  public readonly birthdayMonth: number;
  public readonly birthdayYear: number;
  public readonly email: string;
  public readonly firstname: string;
  public readonly gender: Gender;
  public readonly lastname: string;
  public readonly eventDate: DateTime;

  public constructor(ppsDto: PPSProfileDto) {
    const luxonBirthday = DateTime.fromJSDate(ppsDto.birthday);
    this.birthdayDay = luxonBirthday.day;
    this.birthdayMonth = luxonBirthday.month;
    this.birthdayYear = luxonBirthday.year;
    this.email = ppsDto.email;
    this.firstname = ppsDto.firstname;
    this.gender = ppsDto.gender;
    this.lastname = ppsDto.lastname;
    this.eventDate = DateTime.fromJSDate(ppsDto.event_date);
  }
}
