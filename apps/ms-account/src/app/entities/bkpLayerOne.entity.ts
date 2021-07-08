import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, Tree, TreeChildren, TreeParent } from 'typeorm';
import * as uuid from 'uuid';
import { BkpHierarchyEntity } from './bkphierarchy.entity';
import { BkpLayerTwoEntity } from './bkpLayerTwo.entity';
import ReferanceTypeEntity from './references.entity';

/**
 * 
 */
@Entity({ name: 'bkphierarchyLayerOne' })
export class BkpLayerOneEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    bkpUID: string;

    @Expose()
    @Column({unique: true})
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
            this.bkpUID = this.bkpUID || uuid.v1();
        }
    }
}