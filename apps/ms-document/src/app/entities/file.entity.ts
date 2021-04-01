import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, ObjectIdColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './reference-type.entity';
import { Phases } from './phases.entity';
import { BKP } from './bkp.entity';
import { ProjectFileEntity } from './projectfile.entity';
import { FileVersionEntity } from './fileversion.entity';
import { FileParams } from '../components/file/dto/args/param/file.param';
import { FileParamEntity } from './file.param.entity';


@Entity({ name: 'File' })

export class FileEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  fileURL: string;

  @Column()
  @Expose()
  fileTitle: string;

  @Column()
  @Expose()
  BKPID: string;

  @Column()
  @Expose()
  phaseId: string;


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

  @Expose()
  @ManyToOne(() => ProjectFileEntity, (projectfile: ProjectFileEntity) => projectfile.file)
  projectfile: ProjectFileEntity;

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
