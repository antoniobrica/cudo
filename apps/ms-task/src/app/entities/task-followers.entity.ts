import { plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn } from 'typeorm';
import * as uuid from 'uuid';
/**
 * 
 */
@Entity({ name: 'taskFollowers' })
export default class TaskFllowersEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    PeopleID: string;

    @Column()
    PeopleName: string;

    @Column()
    createdAt?: Date;

    @Column({ nullable: true })
    createdBy?: string;

    @Column()
    updatedAt?: Date;

    @Column({ nullable: true })
    updatedBy?: string;

    @Column({ nullable: true })
    isDeleted?: boolean;

    constructor(taskFllowersEntity: Partial<TaskFllowersEntity>) {
        super();
        if (taskFllowersEntity) {
            Object.assign(
                this,
                plainToClass(TaskFllowersEntity, taskFllowersEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.createdAt = this.createdAt || new Date(new Date().toUTCString());
            this.updatedAt = new Date(new Date().toUTCString());
        }
    }
}