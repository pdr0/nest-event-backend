import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from 'src/auth/profile.entity';
import { User } from 'src/auth/user.entity';
import { Attendee } from 'src/events/attendee.entity';
import { Event } from 'src/events/event.entity';
import { Course } from 'src/school/course.entity';
import { Subject } from 'src/school/subject.entity';
import { Teacher } from 'src/school/teacher.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB_NAME,
    entities: [Event, Attendee, Subject, Teacher, User, Profile, Course],
    synchronize: process.env.DB_SYNC == 'true' ? true : false, // Careful with this property and not put it in production
  }),
);
