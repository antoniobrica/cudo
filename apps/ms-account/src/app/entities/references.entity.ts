import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, ManyToMany, UpdateDateColumn } from 'typeorm';
import * as uuid from 'uuid';
import { BkpEntity } from './bkp.entity';
import { FileEntity } from './file.entity';
import { PhaseEntity } from './phase.entity';
import UsersEntity from './users.entity';

/**
 * 
 */
@Entity({ name: 'references' })
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
    @OneToMany(() => BkpEntity, (bkp: BkpEntity) => bkp.reference)
    bkp: BkpEntity[];

    @Expose()
    @OneToMany(() => PhaseEntity, (phase: PhaseEntity) => phase.reference)
    phase: PhaseEntity[];
    
    @ManyToMany(() => UsersEntity, usersEntity => usersEntity.references)
    users: UsersEntity[];

    @Expose()
    @OneToMany(() => FileEntity, (file: FileEntity) => file.reference)
    file: FileEntity[];

    constructor(referanceTypeEntity: Partial<ReferanceTypeEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(ReferanceTypeEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.createdAt = this.createdAt || new Date(new Date().toUTCString());
            this.updatedAt = new Date(new Date().toUTCString());
        }
    }
}