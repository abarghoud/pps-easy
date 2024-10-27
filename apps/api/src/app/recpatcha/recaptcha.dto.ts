import { IsNotEmpty, IsString } from 'class-validator';

export class RecaptchaDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
