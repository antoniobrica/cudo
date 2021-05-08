import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import * as uuid from 'uuid';
import BKPCostEntity from './bkp-costs.entity';
import ReferanceTypeEntity from './reference-type.entity';

/**
 * 
 */
@Entity({ name: 'costs' })
export class CostEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    costID: string;

    @Expose()
    @Column({ nullable: true })
    structureID: string;

    @Expose()
    @Column({ nullable: true })
    structureName: string;

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
    // n:n relation with TaskFllowersEntity
    @ManyToMany(type => BKPCostEntity, { cascade: true })
    @JoinTable()
    BKPCosts: BKPCostEntity[];

    @Expose()
    @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.costs)
    references: ReferanceTypeEntity;

    constructor(referanceTypeEntity: Partial<CostEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(CostEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.costID = this.costID || uuid.v1();
        }
    }
}