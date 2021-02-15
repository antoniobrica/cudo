import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn } from 'typeorm';

/**
 * 
 */
@Entity({ name: 'TaskFollowers' })
export default class TaskFllowersEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ unique: true })
    PeopleID: string;

    @Column()
    PeopleName: string;

    @CreateDateColumn()
    createdAt?: string;

    @Column({ nullable: true })
    createdBy?: string;

    @CreateDateColumn()
    updatedAt?: number;

    @Column({ nullable: true })
    updatedBy?: string;

    @Column({ nullable: true })
    isDeleted?: boolean;
}