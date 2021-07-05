import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import * as uuid from 'uuid';

/**
 * 
 */
@Entity({ name: 'bkpCostFiles' })
export default class BKPCostFilesEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    bkpCostFileID: string;

    @Column()
    @Expose()
    uploadedFileID: string;

    @Column()
    @Expose()
    uploadedFileTitle: string;

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

    constructor(referanceTypeEntity: Partial<BKPCostFilesEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(BKPCostFilesEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.bkpCostFileID = this.bkpCostFileID || uuid.v1();
        }
    }
}