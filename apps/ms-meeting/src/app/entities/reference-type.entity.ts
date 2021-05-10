import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as uuid from 'uuid';
import SessionEntity from './session.entity';

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
    @OneToMany(() => SessionEntity, (session: SessionEntity) => session.reference)
    sessions: SessionEntity[];

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