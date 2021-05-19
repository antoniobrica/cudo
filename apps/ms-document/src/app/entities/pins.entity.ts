import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as uuid from 'uuid';
import { FileEntity } from './file.entity';

/**
 * 
 */
@Entity({ name: 'pins' })
export default class PinsTypeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    pinsID: string;

    @Expose()
    @Column()
    fileID: string;

    @Expose()
    @Column()
    x_axis: number;

    @Expose()
    @Column()
    y_axis: number;

    @Expose()
    @Column()
    z_axis: number;

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

    constructor(pinsTypeEntity: Partial<PinsTypeEntity>) {
        super();
        if (pinsTypeEntity) {
            Object.assign(
                this,
                plainToClass(PinsTypeEntity, pinsTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.pinsID = this.pinsID || uuid.v1();
        }
    }




}