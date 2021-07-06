import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, Tree, TreeChildren, TreeParent } from 'typeorm';
import * as uuid from 'uuid';
import { BkpHierarchyEntity } from './bkphierarchy.entity';
import ReferanceTypeEntity from './references.entity';

/**
 * 
 */
@Entity({ name: 'bkphierarchyLayerTwo' })
export class BkpLayerTwoEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    bkpUID: string;

    @Expose()
    @Column({ unique: true })
    bkpID: string;

    @Expose()
    @Column()
    bkpTitle?: string;
    
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
    @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.bkphierarchy)
    references: ReferanceTypeEntity;

    constructor(referanceTypeEntity: Partial<BkpLayerTwoEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(BkpLayerTwoEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.bkpUID = this.bkpUID || uuid.v1();
        }
    }
}