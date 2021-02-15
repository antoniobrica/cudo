import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn } from 'typeorm';
import { TasksEntity } from './tasks.entity';

/**
 * 
 */
@Entity({ name: 'ReferenceTypes' })
export default class ReferanceTypeEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ unique: true })
    ReferenceID: string;

    @Column()
    ReferenceType: string;


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


    // 1:n relation with TasksEntity 
    @OneToMany(type => TasksEntity, task => task.taskID)
    tasks: TasksEntity[];
}