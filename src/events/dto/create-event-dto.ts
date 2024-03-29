import { IsString, Length } from 'class-validator';
// Data Transfer Object
export class CreateEventDto {
  @IsString()
  @Length(5, 255, {
    message: 'The name length is wrong',
  })
  name: string;

  @Length(5, 255)
  description: string;

  @IsString()
  when: string;
  @Length(5, 255)
  @Length(10, 255)
  addres: string;
}
