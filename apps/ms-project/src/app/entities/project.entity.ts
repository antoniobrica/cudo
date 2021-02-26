import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, ObjectIdColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsOptional } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';
import * as uuid from 'uuid';
import ReferanceTypeEntity from './reference-type.entity';
import { ProjectWorkTypeEntity } from '../components/ProjectWorkType/project-WorkType.entity';

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
  printingCom?: string;

  @Expose()
  @Column({ nullable: true })
  workType?: string;

  @Expose()
  @Column({ nullable: true })
  estCost?: number;

  @Expose()
  @Column({ nullable: true })
  description?: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date

  @Expose()
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.projects)
  reference: ReferanceTypeEntity;

  @Expose()
  @OneToMany(() => ProjectWorkTypeEntity, (projectwork: ProjectWorkTypeEntity) => projectwork.project)
  projectwork: ProjectWorkTypeEntity;


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
