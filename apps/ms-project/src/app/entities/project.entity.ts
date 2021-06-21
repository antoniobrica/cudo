import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import * as uuid from 'uuid';
import ReferanceTypeEntity from './reference-type.entity';
import { WorkTypeEntity } from './work-type.entity';
import { ProjectWorkTypeEntity } from './project-WorkType.entity';

@Entity({ name: 'projects' })

export class ProjectEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  projectId: string;

  @Expose()
  @Column({ unique: true })
  projectName: string;

  @Expose()
  @Column({ unique: true })
  projectNum: number

  @Expose()
  @Column()
  client: string;

  @Expose()
  @Column({ nullable: true })
  buildingType?: string;

  @Expose()
  @Column({ nullable: true })
  printingCompany?: string;

  @Expose()
  @Column({ nullable: true })
  description?: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date

  @Expose()
  @Column({ nullable: true })
  createdBy?: string;

  @Expose()
  @UpdateDateColumn()
  updatedAt?: Date

  @Expose()
  @Column({ nullable: true })
  updatedBy?: string;

  @Expose()
  @Column({ nullable: true })
  isDeleted?: boolean;

  @Expose()
  @Column({ nullable: true })
  addressLineOne?: string;

  @Expose()
  @Column({ nullable: true })
  addressLineTwo?: string;

  @Expose()
  @Column({ nullable: true })
  city?: string;

  @Expose()
  @Column({ nullable: true })
  state?: string;

  @Expose()
  @Column({ nullable: true })
  zip?: string;

  @Expose()
  @Column({ nullable: true })
  country?: string;

  @Expose()
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.projects)
  reference: ReferanceTypeEntity;

  @Expose()
  @OneToMany(() => ProjectWorkTypeEntity, (projectwork: ProjectWorkTypeEntity) => projectwork.project)
  projectWorkTypes: ProjectWorkTypeEntity[];


  constructor(projectEntity: Partial<ProjectEntity>) {
    super();
    if (projectEntity) {
      Object.assign(
        this,
        plainToClass(ProjectEntity, projectEntity, {
          excludeExtraneousValues: true
        })
      )
      this.projectId = this.projectId || uuid.v1();
      // this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      // this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
