import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'date' })
    birthday: string;

    @Column({ nullable: true })
    category: string;

    @ManyToOne(() => User, (user) => user.friends, { onDelete: 'CASCADE' })
    user: User;
}
