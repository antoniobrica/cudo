import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TasksEntity } from './tasks.entity';
import * as uuid from 'uuid';

/**
 * 
 */
@Entity({ name: 'referenceTypes' })
export default class ReferanceTypeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    referenceID: string;

    @Expose()
    @Column({ nullable: true })
    referenceType: string;

    @Expose()
    @Column()
    name: string;

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

    // 1:n relation with TasksEntity 
    @Expose()
    @OneToMany(() => TasksEntity, (task: TasksEntity) => task.reference)
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
        }
    }
}