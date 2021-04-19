import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import * as uuid from 'uuid';
import { MileStoneEntity } from './milestone.entity';
import { TasksEntity } from './tasks.entity';
/**
 * 
 */
@Entity({ name: 'taskfile' })
export default class TaskFileEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ nullable: true })
    fileID: string;

    @Expose()
    @Column({ nullable: true })
    fileName: string;

    @Expose()
    @Column({ nullable: true })
    fileUrl: string;

    @Expose()
    @ManyToMany(() => TasksEntity, tasksEntity => tasksEntity.files)
    tasks?: TasksEntity[];

    @Expose()
    @ManyToMany(() => MileStoneEntity, mileStoneEntity => mileStoneEntity.files)
    milestone?: MileStoneEntity[];

    constructor(taskFileEntity: Partial<TaskFileEntity>) {
        super();
        if (taskFileEntity) {
            Object.assign(
                this,
                plainToClass(TaskFileEntity, taskFileEntity, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}