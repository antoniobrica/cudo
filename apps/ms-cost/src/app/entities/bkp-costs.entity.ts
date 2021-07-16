import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import * as uuid from 'uuid';
import BKPCostFilesEntity from './bkp-cost-files.entity';

/**
 * 
 */
@Entity({ name: 'bkpCosts' })
export default class BKPCostEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    bkpCostID: string;

    @Expose()
    @Column({ nullable: true })
    BKPID: string;

    @Expose()
    @Column({ nullable: true })
    BKPTitle: string;

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
    isDeleted?: Boolean;

    @Expose()
    // n:n relation with TaskFllowersEntity
    @ManyToMany(type => BKPCostFilesEntity, { cascade: true })
    @JoinTable()
    bkpCostFiles: BKPCostFilesEntity[];


    constructor(referanceTypeEntity: Partial<BKPCostEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(BKPCostEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.itemTotalPrice = this.itemQuantity * this.itemPrice;
            this.bkpCostID = this.bkpCostID || uuid.v1();
        }
    }
}