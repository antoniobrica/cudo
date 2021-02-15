import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn } from 'typeorm';
import { ProjectTasksEntity } from './project-tasks.entity';

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


    // 1:n relation with ProjectTasksEntity 
    @OneToMany(type => ProjectTasksEntity, task => task.taskID)
    tasks: ProjectTasksEntity[];
}