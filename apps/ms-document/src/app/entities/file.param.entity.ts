import { Expose, plainToClass } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";
import * as uuid from 'uuid';
import FileReferencesEntity from "./fileReference.entity";

@Entity({ name: 'files' })
@Tree("closure-table")
export class FileParamEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    fileID: string;

    @Column()
    @Expose()
    fileURL: string;

    @Expose()
    @Column({ nullable: true })
    parentFileID?: string;

    @Column()
    @Expose()
    fileTitle: string;

    @Column({ nullable: true })
    @Expose()
    fileType: string;

    @Column({ nullable: true })
    @Expose()
    fileVersion: number;

    @TreeChildren()
    children: FileParamEntity[];

    @TreeParent()
    parent: FileParamEntity;

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
    @Column({ nullable: true })
    referenceID: string;

    @Expose()
    @Column({ nullable: true })
    referenceType: string;

    @Expose()
    @Column({ nullable: true })
    referenceTitle: string;

    @Expose()
    @ManyToMany(type => FileReferencesEntity, { cascade: true })
    @JoinTable()
    fileReferences: FileReferencesEntity[];

    constructor(fileParamEntity: Partial<FileParamEntity>) {
        super();
        if (fileParamEntity) {
            Object.assign(
                this,
                plainToClass(FileParamEntity, fileParamEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.fileID = this.fileID || uuid.v1();
        }
    }

}