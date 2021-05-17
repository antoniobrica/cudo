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
    @Column({ nullable: true })
    userID: string;

    @Expose()
    @Column({ nullable: true })
    userName: string;

    @Expose()
    @Column({ nullable: true })
    imageUrl: string;

    @Expose()
    @Column({ nullable: true })
    email: string;

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
    @ManyToMany(() => ReferanceTypeEntity, (referanceTypeEntity: ReferanceTypeEntity) => referanceTypeEntity.users, { cascade: true })
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