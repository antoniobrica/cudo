import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, Tree, TreeChildren, TreeParent } from 'typeorm';
import * as uuid from 'uuid';
import { BkpLayerOneEntity } from './bkpLayerOne.entity';
import { BkpLayerTwoEntity } from './bkpLayerTwo.entity';
import ReferanceTypeEntity from './references.entity';

/**
 * 
 */
@Entity({ name: 'bkphierarchy' })
export class BkpHierarchyEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    bkpUID: string;

    @Expose()
    @Column({unique: true})
    bkpID: string;

    @Expose()
    @Column({unique: true})
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

    @JoinTable() 
    @ManyToMany(type => BkpLayerOneEntity, { cascade: true })
    public children: BkpLayerOneEntity[];

    // @TreeChildren()
    // children: BkpHierarchyEntity[];
  
    // @TreeParent()
    // parent: BkpHierarchyEntity;

    @Expose()
    @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.bkphierarchy)
    references: ReferanceTypeEntity;

    constructor(referanceTypeEntity: Partial<BkpHierarchyEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(BkpHierarchyEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.bkpUID = this.bkpUID || uuid.v1();
        }
    }
}