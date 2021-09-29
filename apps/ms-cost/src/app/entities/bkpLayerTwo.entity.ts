import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, } from 'typeorm';
import * as uuid from 'uuid';
import ReferanceTypeEntity from './reference-type.entity';
import BKPCostFilesEntity from './bkp-cost-files.entity'

/**
 * 
 */
@Entity({ name: 'bkpCosts' })
export class BkpLayerTwoEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    bkpCostID: string;

    @Expose()
    @Column()
    BKPID: string;

    @Expose()
    @Column()
    BKPTitle?: string;

    @Expose()
    @Column({ nullable: true })
    description: string;

    @Expose()
    @Column({ nullable: true })
    itemQuantity: number;

    @Expose()
    @Column({ nullable: true })
    itemPrice: number;

    @Expose()
    @Column({ nullable: true })
    itemTotalPrice: number;

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
    @Column({ nullable: true, default: false })
    isDeleted?: boolean;

    @Expose()
    @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.bkphierarchy)
    references: ReferanceTypeEntity;

    @Expose()
    @ManyToMany(() => BKPCostFilesEntity, { cascade: true })
    @JoinTable()
    files: BKPCostFilesEntity[];

    constructor(referanceTypeEntity: Partial<BkpLayerTwoEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(BkpLayerTwoEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.bkpCostID = this.bkpCostID || uuid.v1();
        }
    }
}