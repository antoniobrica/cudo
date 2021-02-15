import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn } from 'typeorm';

/**
 * 
 */
@Entity({ name: 'TaskAssignees' })
export default class TaskAssigneessEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ unique: true })
    PeopleID: string;

    @Column()
    PeopleName: string;

    @CreateDateColumn()
    createdAt?: string;

    @Column()
    createdBy?: string;

    @CreateDateColumn()
    updatedAt?: number;

    @Column()
    updatedBy?: string;

    @Column({ nullable: true })
    isDeleted?: boolean;
}