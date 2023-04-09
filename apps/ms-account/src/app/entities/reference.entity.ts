import { Expose, plainToClass } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  UpdateDateColumn,
  Relation,
} from 'typeorm';
import UsersEntity from './users.entity';
import { FileTypeEntity } from './file-type.entity';
import { BkpEntity } from './bkp.entity';
import { FileEntity } from './file.entity';
import { FileStructureEntity } from './filestructure.entity';
import { FolderEntity } from './folder.entity';
import { PhaseEntity } from './phase.entity';
import * as uuid from 'uuid';

/**
 *
 */
@Entity({ name: 'reference' })
export default class ReferanceTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  referenceID: string;

  @Expose()
  @Column({ nullable: true })
  referenceType: string;

  @Expose()
  @Column({ nullable: true })
  name: string;

  @Expose()
  @Column({ nullable: true })
  imageUrl: string;

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
  @OneToMany(() => BkpEntity, (bkp: BkpEntity) => bkp.reference)
  bkps: Relation<BkpEntity>[];

  @Expose()
  @OneToMany(() => FolderEntity, (folder: FolderEntity) => folder.reference)
  folders: Relation<FolderEntity[]>;

  @Expose()
  @OneToMany(
    () => FileTypeEntity,
    (filetype: FileTypeEntity) => filetype.reference
  )
  filetypes: Relation<FileTypeEntity>[];

  @Expose()
  @OneToMany(
    () => FileStructureEntity,
    (filestructure: FileStructureEntity) => filestructure.reference
  )
  filestructures: Relation<FileStructureEntity>[];

  @Expose()
  @OneToMany(() => PhaseEntity, (phase: PhaseEntity) => phase.reference)
  phases: Relation<PhaseEntity>[];

  @Expose()
  @ManyToMany(() => UsersEntity, (usersEntity) => usersEntity.references)
  users: UsersEntity[];

  @Expose()
  @OneToMany(() => FileEntity, (file: FileEntity) => file.reference)
  files: Relation<FileEntity>[];

  constructor(referanceTypeEntity: Partial<ReferanceTypeEntity>) {
    super();
    if (referanceTypeEntity) {
      Object.assign(
        this,
        plainToClass(ReferanceTypeEntity, referanceTypeEntity, {
          excludeExtraneousValues: true,
        })
      );
      this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
