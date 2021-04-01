import { Expose, plainToClass } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'fileParam' })

export class FileParamEntity extends BaseEntity {

@PrimaryGeneratedColumn()
id: number;

@Column({ unique: true })
@Expose()
fileURL: string;

@Column()
@Expose()
fileTitle: string;

constructor(fileParamEntity: Partial<FileParamEntity>) {
    super();
    if (fileParamEntity) {
        Object.assign(
            this,
            plainToClass(FileParamEntity, fileParamEntity, {
                excludeExtraneousValues: true
            })
        )
    }
}
}