import { IsString } from 'class-validator';

export class PayloadToken {
  @IsString()
  role: string;

  sub: number;
}
