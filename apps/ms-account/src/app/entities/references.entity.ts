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
import * as uuid from 'uuid';
import { BkpEntity } from './bkp.entity';
import { BkpHierarchyEntity } from './bkphierarchy.entity';
import { FileTypeEntity } from './file-type.entity';
import { FileEntity } from './file.entity';
import { FileStructureEntity } from './filestructure.entity';
import { FolderEntity } from './folder.entity';
import { PhaseEntity } from './phase.entity';
import UsersEntity from './users.entity';
import { WorkTypeEntity } from './workType.entity';

/**
 *
 */
@Entity({ name: 'references' })
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
  bkp: Relation<BkpEntity>[];

  @Expose()
  @OneToMany(() => FolderEntity, (folder: FolderEntity) => folder.reference)
  folder: Relation<FolderEntity>[];

  @Expose()
  @OneToMany(() => FileTypeEntity, (filetype: FileTypeEntity) => filetype.reference)
  filetype: Relation<FileTypeEntity>[];

  @Expose()
  @OneToMany(() => FileStructureEntity, (filestructure: FileStructureEntity) => filestructure.reference)
  filestructure: Relation<FileStructureEntity>[];

  @Expose()
  @OneToMany(() => PhaseEntity, (phase: PhaseEntity) => phase.reference)
  phase: Relation<PhaseEntity>[];

  @ManyToMany(() => UsersEntity, (usersEntity) => usersEntity.references)
  users: UsersEntity[];

  @Expose()
  @OneToMany(() => FileEntity, (file: FileEntity) => file.reference)
  file: Relation<FileEntity>[];

  @Expose()
  @OneToMany(() => WorkTypeEntity, (worktype: WorkTypeEntity) => worktype.reference)
  worktype: Relation<WorkTypeEntity>[];

  @Expose()
  @OneToMany(() => BkpHierarchyEntity, (file: BkpHierarchyEntity) => file.references)
  bkphierarchy: Relation<BkpHierarchyEntity>[];

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
