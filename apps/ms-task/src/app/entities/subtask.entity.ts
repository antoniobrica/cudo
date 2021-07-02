import { ObjectType } from "@nestjs/graphql";
import * as uuid from 'uuid';
import {  BaseEntity, Column, Entity,  ManyToMany,  OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import { TasksEntity } from "./tasks.entity";

@ObjectType()
@Entity({name: 'subtask'})
export class SubTaskEntity extends BaseEntity{


    @PrimaryGeneratedColumn()
    Id: number;

    @Expose()
    @Column({nullable: true})
    taskID: string;

    @Expose()
    @Column({ nullable: true })
    subtaskID?: string;

    @Expose()
    @Column({ nullable: true })
    subtaskTitle?: string;

    @Expose()
    @Column({ nullable: true })
    status?: string;

    @Expose()
    @Column({ nullable: true, default: false })
    isDeleted?: boolean;

    @Expose()
    @ManyToMany(() => TasksEntity, tasksEntity => tasksEntity.subtasks)
    tasks?: TasksEntity[];

    constructor(subtaskEntity: Partial<SubTaskEntity>) {
        super();
        if (subtaskEntity) {
            Object.assign(
                this,
                plainToClass(SubTaskEntity, subtaskEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.subtaskID = this.subtaskID || uuid.v1();
        }
    }
}