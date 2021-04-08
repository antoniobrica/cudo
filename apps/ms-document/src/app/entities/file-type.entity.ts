import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './reference-type.entity';


@Entity({ name: 'filetype' })

export class FileTypeEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  fileTypeID: string;

  @Column()
  @Expose()
  fileTypeTitle: string;

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
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.filetype)
  reference: ReferanceTypeEntity;

  constructor(fileTypeEntity: Partial<FileTypeEntity>) {
    super();
    if (fileTypeEntity) {
      Object.assign(
        this,
        plainToClass(FileTypeEntity, fileTypeEntity, {
          excludeExtraneousValues: true
        })
      )
    }
  }
}
