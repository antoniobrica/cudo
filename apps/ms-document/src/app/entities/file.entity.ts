import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './reference-type.entity';
import { FileParamEntity } from './file.param.entity';
import * as uuid from 'uuid';
import { PeopleEntity } from './people.entity';

@Entity({ name: 'File' })

export class FileEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  projectFileID: string;

  @Expose()
  @Column()
  isFolder?: boolean;

  @Column({ nullable: true })
  @Expose()
  folderName: string;

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
  @ManyToMany(type => FileParamEntity, { cascade: true })
  @JoinTable()
  files: FileParamEntity[];

  @Expose()
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.file)
  reference: ReferanceTypeEntity;

  @Expose()
  // n:n relation with PeopleEntity
  @ManyToMany(type => PeopleEntity, { cascade: true })
  @JoinTable()
  people: PeopleEntity[];

  constructor(fileEntity: Partial<FileEntity>) {
    super();
    if (fileEntity) {
      Object.assign(
        this,
        plainToClass(FileEntity, fileEntity, {
          excludeExtraneousValues: true
        })
      )
      this.projectFileID = this.projectFileID || uuid.v1();
    }
  }
}
