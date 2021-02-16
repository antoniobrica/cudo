import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn } from 'typeorm';
import { TasksEntity } from './tasks.entity';
import * as uuid from 'uuid';

/**
 * 
 */
@Entity({ name: 'ReferenceTypes' })
export default class ReferanceTypeEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Expose()
    @Column({ unique: true })
    referenceID: string;

    @Expose()
    @Column({ nullable: true })
    referenceType: string;

    @Expose()
    @Column()
    createdAt?: Date;

    @Expose()
    @Column({ nullable: true })
    createdBy?: string;

    @Expose()
    @Column()
    updatedAt?: Date;

    @Expose()
    @Column({ nullable: true })
    updatedBy?: string;

    @Expose()
    @Column({ nullable: true })
    isDeleted?: boolean;

    // 1:n relation with TasksEntity 
    @Expose()
    @OneToMany(type => TasksEntity, task => task.taskID)
    tasks: TasksEntity[];

    constructor(referanceTypeEntity: Partial<ReferanceTypeEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(ReferanceTypeEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this._id = this._id || uuid.v1();
            this.createdAt = this.createdAt || new Date(new Date().toUTCString());
            this.updatedAt = new Date(new Date().toUTCString());
        }
    }
}