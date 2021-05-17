import { Expose, plainToClass } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as uuid from 'uuid';


@Entity({ name: 'files' })
export class FileParamEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    fileID: string;

    @Column()
    @Expose()
    fileURL: string;

    // @Expose()
    // @Column({ nullable: true })
    // generateFileName?: boolean;

    @Column()
    @Expose()
    fileTitle: string;

    @Column({ nullable: true })
    @Expose()
    fileType: string;

    @Column({ nullable: true })
    @Expose()
    fileVersion: string;

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