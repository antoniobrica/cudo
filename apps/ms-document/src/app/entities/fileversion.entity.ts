import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { FileEntity } from './file.entity';



@Entity({ name: 'fileversion' })

export class FileVersionEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  fileID: string;

  @Column()
  @Expose()
  fileVersion: string;

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
  @ManyToOne(() => FileEntity, (filevrsion: FileEntity) => filevrsion.projectFileID)
  filevrsion: FileEntity[];


  constructor(fileversionEntity: Partial<FileVersionEntity>) {
    super();
    if (fileversionEntity) {
      Object.assign(
        this,
        plainToClass(FileVersionEntity, fileversionEntity, {
          excludeExtraneousValues: true
        })
      )
      this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
