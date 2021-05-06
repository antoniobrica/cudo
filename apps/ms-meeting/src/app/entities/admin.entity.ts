import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import * as uuid from 'uuid';
import SessionEntity from './session.entity';
/**
 * 
 */
@Entity({ name: 'admins' })
export default class AdminEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    adminID: string;

    @Expose()
    @Column()
    adminName: string;

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
    @ManyToMany(() => SessionEntity, session => session.admins)
    sessions?: SessionEntity[];

    constructor(adminEntity: Partial<AdminEntity>) {
        super();
        if (adminEntity) {
            Object.assign(
                this,
                plainToClass(AdminEntity, adminEntity, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}