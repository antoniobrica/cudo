import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, Tree, TreeChildren, TreeParent } from 'typeorm';
import * as uuid from 'uuid';
import { BkpLayerTwoEntity } from './bkpLayerTwo.entity';
import ReferanceTypeEntity from './reference-type.entity';

/**
 * 
 */
@Entity({ name: 'bkphierarchyLayerOne' })
export class BkpLayerOneEntity extends BaseEntity {

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

    @JoinTable() 
    @ManyToMany(type => BkpLayerTwoEntity, { cascade: true })
    public bkpChildrenLayerTwo: BkpLayerTwoEntity[];

    // @JoinTable() 
    // @ManyToMany(type => BkpHierarchyEntity, { cascade: true })
    // public parent: BkpHierarchyEntity[];

    @Expose()
    @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.bkphierarchy)
    references: ReferanceTypeEntity;

    constructor(referanceTypeEntity: Partial<BkpLayerOneEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(BkpLayerOneEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.bkpCostID = this.bkpCostID || uuid.v1();
        }
    }
}