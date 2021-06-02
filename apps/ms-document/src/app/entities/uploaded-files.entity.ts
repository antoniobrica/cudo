import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import * as uuid from 'uuid';
import { PeopleEntity } from './people.entity';
import FileReferencesEntity from './fileReference.entity';

@Entity({ name: 'uploadedFile' })
@Tree("closure-table")
export class UploadedFilesEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  uploadedFileID: string;

  @Expose()
  @Column({ nullable: true })
  parentUploadedFileID?: string;

  @Column({ nullable: true })
  @Expose()
  directory: string;

  @Column({ nullable: true })
  @Expose()
  structureID: string;

  @Column({ nullable: true })
  @Expose()
  structureTitle: string;

  @Column({ nullable: true })
  @Expose()
  BKPID: string;

  @Column({ nullable: true })
  @Expose()
  BKPIDTitle: string;

  @Column({ nullable: true })
  @Expose()
  phaseID: string;

  @Column({ nullable: true })
  @Expose()
  phaseName: string;

  @Expose()
  @Column({ nullable: true })
  generateFileName?: boolean;

  @Column()
  @Expose()
  fileTypeID?: string;

  @Column()
  @Expose()
  fileTypeName?: string;

  @Column()
  @Expose()
  isEveryOneAllowed?: boolean;

  @Column()
  @Expose()
  fileURL: string;

  @Expose()
  @Column({ nullable: true })
  fileTitle: string;

  @Expose()
  @Column({ nullable: true })
  fileType: string;

  @Expose()
  @Column({ nullable: true })
  fileVersion: number;

  @Expose()
  @Column()
  referenceID: string;

  @Expose()
  @Column()
  referenceType: string;

  @Expose()
  @Column()
  referenceTitle: string;

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

  @TreeChildren()
  children: UploadedFilesEntity[];

  @TreeParent()
  parent: UploadedFilesEntity;

  @Expose()
  @ManyToMany(() => FileReferencesEntity, { cascade: true })
  @JoinTable()
  fileReferences: FileReferencesEntity[];

  @Expose()
  // n:n relation with PeopleEntity
  @ManyToMany(() => PeopleEntity, { cascade: true })
  @JoinTable()
  people: PeopleEntity[];

  constructor(uploadedFilesEntity: Partial<UploadedFilesEntity>) {
    super();
    if (uploadedFilesEntity) {
      Object.assign(
        this,
        plainToClass(UploadedFilesEntity, uploadedFilesEntity, {
          excludeExtraneousValues: true
        })
      )
      this.uploadedFileID = this.uploadedFileID || uuid.v1();
    }
  }
}
