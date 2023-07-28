import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import * as uuid from 'uuid';
import { UploadedFilesEntity } from './uploaded-files.entity';

/**
 * 
 */
@Entity({ name: 'fileReferences' })
export default class FileReferencesEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    fileReferenceID: string;

    @Expose()
    @Column()
    referenceID: string;

    @Expose()
    @Column()
    referenceType: string;

    @Expose()
    @Column()
    referenceTitle: string;

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

    @ManyToMany(type => UploadedFilesEntity, fileParamEntity => fileParamEntity.fileReferences) // specify inverse side as a second parameter
    files: UploadedFilesEntity[];

    constructor(referanceTypeEntity: Partial<FileReferencesEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(FileReferencesEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.fileReferenceID = this.fileReferenceID || uuid.v1();
        }
    }




}