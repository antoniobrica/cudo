import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { FileEntity } from './file.entity';
import { FileStructureEntity } from './filestructure.entity';
import { FileUserEntity } from './fileuser.entity';



@Entity({ name: 'projectfile' })

export class ProjectFileEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  projectId: string;

  @Column()
  @Expose()
  phaseId: string;

  @Column()
  @Expose()
  filetypeId: string;

  @Column()
  @Expose()
  filestructureId: string;

  @Column()
  @Expose()
  folderName: string;

  @Column()
  @Expose()
  bkpId: string;

  @Expose()
  @Column({ nullable: true })
  isFolderNameExist?: boolean;

  @Expose()
  @Column({ nullable: true })
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

  @OneToMany(type => FileEntity, file => file.projectfile) 
  file: FileEntity[];

  @ManyToOne(type => FileStructureEntity, filestructure => filestructure.projectfile) 
  filestructure: FileStructureEntity;

  @ManyToMany(type => FileUserEntity, fileuser => fileuser.projectfile) 
  fileuser: FileUserEntity;


  constructor(fileEntity: Partial<ProjectFileEntity>) {
    super();
    if (fileEntity) {
        Object.assign(
            this,
            plainToClass(ProjectFileEntity, fileEntity, {
                excludeExtraneousValues: true
            })
        )
        this.createdAt = this.createdAt || new Date(new Date().toUTCString());
        this.updatedAt = new Date(new Date().toUTCString());
    }
}
}
