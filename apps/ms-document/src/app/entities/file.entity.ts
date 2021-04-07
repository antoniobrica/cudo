import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './reference-type.entity';
import { Phases } from './phases.entity';
import { BKP } from './bkp.entity';
import { ProjectFileEntity } from './projectfile.entity';
import { FileVersionEntity } from './fileversion.entity';
import { FileParamEntity } from './file.param.entity';
import { FileStructureEntity } from './filestructure.entity';
import { Folder } from './folder.entity';


@Entity({ name: 'File' })

export class FileEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  isFolder?: boolean;

  @Column({ nullable: true })
  @Expose()
  folderName: string;

  @Column({ nullable: true })
  @Expose()
  structureId: string;

  @Column({ nullable: true })
  @Expose()
  structureTitle: string;


  @Column({ nullable: true })
  @Expose()
  BKPID: string;

  @Column({ nullable: true })
  @Expose()
  phaseID: string;

  @Column()
  @Expose()
  fileTypeID?: string;

  @Column()
  @Expose()
  fileTypeName?: string;

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
  @ManyToMany(type => FileParamEntity)
  @JoinTable()
  fileParam: FileParamEntity[];

  @Expose()
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.file)
  reference: ReferanceTypeEntity;

  @ManyToMany(type => Phases, phase => phase.file) // specify inverse side as a second parameter
  @JoinColumn()
  phase: Phases[];

  @ManyToMany(type => BKP, phase => phase.file) // specify inverse side as a second parameter
  @JoinColumn()
  bkp: BKP[];

  @ManyToMany(type => Folder, folder => folder.file) // specify inverse side as a second parameter
  @JoinColumn()
  folder: Folder[];

  @Expose()
  @ManyToOne(() => ProjectFileEntity, (projectfile: ProjectFileEntity) => projectfile.file)
  @JoinTable()
  projectfile: ProjectFileEntity;

  @ManyToOne(type => FileStructureEntity, filestructure => filestructure.projectfile) 
  filestructure: FileStructureEntity;

  @Expose()
  @OneToMany(() => FileVersionEntity, (file: FileVersionEntity) => file.filevrsion)
  file: FileVersionEntity;

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
