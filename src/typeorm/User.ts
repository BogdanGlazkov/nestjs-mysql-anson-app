import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({ nullable: false, default: 'User' })
  username: string;

  @Column({ nullable: false, default: '' })
  email: string;

  @Column({ nullable: false, default: '' })
  password: string;
}
