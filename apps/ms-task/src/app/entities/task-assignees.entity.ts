import { plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn } from 'typeorm';
import * as uuid from 'uuid';
/**
 * 
 */
@Entity({ name: 'taskAssignees' })
export default class TaskAssigneessEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    PeopleID: string;

    @Column()
    PeopleName: string;

    @Column()
    createdAt?: Date;

    @Column()
    createdBy?: string;

    @Column()
    updatedAt?: Date;

    @Column()
    updatedBy?: string;

    @Column({ nullable: true })
    isDeleted?: boolean;

    constructor(taskAssigneessEntity: Partial<TaskAssigneessEntity>) {
        super();
        if (taskAssigneessEntity) {
            Object.assign(
                this,
                plainToClass(TaskAssigneessEntity, taskAssigneessEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.createdAt = this.createdAt || new Date(new Date().toUTCString());
            this.updatedAt = new Date(new Date().toUTCString());
        }
    }
}