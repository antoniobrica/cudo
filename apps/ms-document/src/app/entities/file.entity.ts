import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';



@Entity({ name: 'file' })

export class FileEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  fileId: string;

  @Column()
  @Expose()
  fileName: string;


  constructor(fileEntity: Partial<FileEntity>) {
    super();
    if (fileEntity) {
        Object.assign(
            this,
            plainToClass(FileEntity, fileEntity, {
                excludeExtraneousValues: true
            })
        )
    }
}
}
