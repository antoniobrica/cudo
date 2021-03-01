import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import * as uuid from 'uuid';
import { TasksEntity } from './tasks.entity';
/**
 * 
 */
@Entity({ name: 'taskFollowers' })
export default class TaskFllowersEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    userID: string;

    @Expose()
    @Column()
    userName: string;

    @Expose()
    @CreateDateColumn()
    createdAt?: Date;

    @Expose()
    @Column({ nullable: true })
    createdBy?: string;

    @Expose()
    @UpdateDateColumn()
    updatedAt?: Date;

    @Expose()
    @Column({ nullable: true })
    updatedBy?: string;

    @Expose()
    @Column({ nullable: true })
    isDeleted?: boolean;

    @Expose()
    @ManyToMany(() => TasksEntity, tasksEntity => tasksEntity.followers)
    tasks: TasksEntity[];

    constructor(taskFllowersEntity: Partial<TaskFllowersEntity>) {
        super();
        if (taskFllowersEntity) {
            Object.assign(
                this,
                plainToClass(TaskFllowersEntity, taskFllowersEntity, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}