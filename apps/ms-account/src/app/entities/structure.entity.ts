import { Expose, plainToClass } from "class-transformer";
import { Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import * as uuid from 'uuid';

@Entity()
@Tree("closure-table")
export class Structure extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Expose()
    structureID: string;

    @Column()
    structureName: string;

    @Column()
    referenceID: string;

    @Column()
    referenceType: string;

    @TreeChildren()
    children: Structure[];

    @TreeParent()
    parent: Structure;

    // @Expose()
    // @CreateDateColumn()
    // createdAt?: Date;

    // @Expose()
    // @Column({ nullable: true })
    // createdBy?: string;

    // @Expose()
    // @UpdateDateColumn()
    // updatedAt?: Date;

    // @Expose()
    // @Column({ nullable: true })
    // updatedBy?: string;

    // @Expose()
    // @Column({ nullable: true })
    // isDeleted?: boolean;

    constructor(usersEntity: Partial<Structure>) {
        super();
        if (usersEntity) {
            Object.assign(
                this,
                plainToClass(Structure, usersEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.structureID = this.structureID || uuid.v1();
        }
    }
}