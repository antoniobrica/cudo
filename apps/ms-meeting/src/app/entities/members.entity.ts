import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import * as uuid from 'uuid';
import SessionEntity from './session.entity';
/**
 * 
 */
@Entity({ name: 'members' })
export default class MembersEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    memberID: string;

    @Expose()
    @Column()
    memberName: string;

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
    @ManyToMany(() => SessionEntity, tasksEntity => tasksEntity.members)
    tasks: SessionEntity[];

    constructor(membersEntity: Partial<MembersEntity>) {
        super();
        if (membersEntity) {
            Object.assign(
                this,
                plainToClass(MembersEntity, membersEntity, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}