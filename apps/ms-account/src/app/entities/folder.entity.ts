import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './references.entity';
import * as uuid from 'uuid';

@Entity({ name: 'folder' })
export class FolderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  folderID: string;

  @Column({ unique: true })
  @Expose()
  folderTitle: string;

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
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.folder)
  reference: Relation<ReferanceTypeEntity>;

  constructor(folderEntity: Partial<FolderEntity>) {
    super();
    if (folderEntity) {
      Object.assign(
        this,
        plainToClass(FolderEntity, folderEntity, {
          excludeExtraneousValues: true,
        })
      );
      this.folderID = this.folderID || uuid.v1();
    }
  }
}
