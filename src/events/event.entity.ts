import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Attendee } from './attendee.entity';
import { User } from 'src/auth/user.entity';
@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;

  // First param, a function that returns the type of the relation
  // Second param, other side of the relation with a function and a given argument of the relative type
  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    cascade: true,
  })
  attendees: Attendee[];

  @ManyToOne(() => User, (user) => user.organized)
  @Expose()
  organizer: User;

  @Column({ nullable: true })
  organizerId: number;
}
