import { Gender } from './gender.enum';

export class UserPersonalInfoEntity {
  public constructor(
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly birthday: string,
    public readonly gender: Gender,
  ) {
  }

  public toPlain(): Partial<UserPersonalInfoEntity> {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      birthday: this.birthday,
      gender: this.gender,
    }
  }
}
