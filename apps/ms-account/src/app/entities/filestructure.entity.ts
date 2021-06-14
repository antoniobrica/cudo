import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './references.entity';
import * as uuid from 'uuid';

@Entity({ name: 'filestructure' })

export class FileStructureEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  fileStructureID: string;

  @Column()
  @Expose()
  fileStructureTitle: string;

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
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.filestructure)
  reference: ReferanceTypeEntity;


  constructor(filestructureEntity: Partial<FileStructureEntity>) {
    super();
    if (filestructureEntity) {
      Object.assign(
        this,
        plainToClass(FileStructureEntity, filestructureEntity, {
          excludeExtraneousValues: true
        })
      )
      this.fileStructureID = this.fileStructureID || uuid.v1();
    }
  }
}
