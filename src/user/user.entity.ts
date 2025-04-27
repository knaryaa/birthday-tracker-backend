import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Friend } from '../friend/friend.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @OneToMany(() => Friend, (friend) => friend.user)
    friends: Friend[];
}
