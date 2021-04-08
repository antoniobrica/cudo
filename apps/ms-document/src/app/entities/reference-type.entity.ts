import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as uuid from 'uuid';
import { FileTypeEntity } from './file-type.entity';
import { FileEntity } from './file.entity';

/**
 * 
 */
@Entity({ name: 'references' })
export default class ReferanceTypeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    referenceID: string;

    @Expose()
    @Column()
    referenceType: string;

    @Expose()
    @Column()
    name: string;

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


    @Expose()
    @OneToMany(() => FileEntity, (file: FileEntity) => file.reference)
    file: FileEntity[];
    // 1:n relation with TasksEntity 

    @Expose()
    @OneToMany(() => FileTypeEntity, (filetype: FileTypeEntity) => filetype.reference)
    filetype: FileTypeEntity[];

    constructor(referanceTypeEntity: Partial<ReferanceTypeEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(ReferanceTypeEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            // this.createdAt = this.createdAt || new Date(new Date().toUTCString());
            // this.updatedAt = new Date(new Date().toUTCString());
        }
    }




}