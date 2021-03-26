import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './references.entity';


@Entity({ name: 'file' })

export class FileEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  fileID: string;

  @Column()
  @Expose()
  fileTitle: string;

  @Column()
  @Expose()
  sasUrl: string;

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
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.file)
  reference: ReferanceTypeEntity[];


  constructor(fileEntity: Partial<FileEntity>) {
    super();
    if (fileEntity) {
      Object.assign(
        this,
        plainToClass(FileEntity, fileEntity, {
          excludeExtraneousValues: true
        })
      )
      this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
