import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import * as uuid from 'uuid';
import ReferanceTypeEntity from './references.entity';

/**
 * 
 */
@Entity({ name: 'users' })
export default class UsersEntity extends BaseEntity {

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
    @ManyToMany(() => ReferanceTypeEntity, (referanceTypeEntity: ReferanceTypeEntity) => referanceTypeEntity.users)
    @JoinTable()
    references: ReferanceTypeEntity[];

    constructor(usersEntity: Partial<UsersEntity>) {
        super();
        if (usersEntity) {
            Object.assign(
                this,
                plainToClass(UsersEntity, usersEntity, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}