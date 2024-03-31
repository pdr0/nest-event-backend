import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Attendee } from './attendee.entity';
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
}
