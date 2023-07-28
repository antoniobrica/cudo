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
import * as uuid from 'uuid';
import { WorkTypeEntity } from './work-type.entity';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'projectWorkTypes' })
export class ProjectWorkTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  projectWorkTypeID: string;

  @Expose()
  @Column({ nullable: true })
  workID?: string;

  @Expose()
  @Column({ nullable: true })
  workTypeName: string;

  @Expose()
  @Column()
  estimatedCost: number;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;

  @Expose()
  @ManyToOne(() => WorkTypeEntity, (work: WorkTypeEntity) => work.projectWorkTypes)
  workType: Relation<WorkTypeEntity>;

  @Expose()
  @ManyToOne(() => ProjectEntity, (project: ProjectEntity) => project.projectWorkTypes)
  project: Relation<ProjectEntity>[];

  constructor(proejctWorkTypeEntity: Partial<ProjectWorkTypeEntity>) {
    super();
    if (proejctWorkTypeEntity) {
      Object.assign(
        this,
        plainToClass(ProjectWorkTypeEntity, proejctWorkTypeEntity, {
          excludeExtraneousValues: true,
        })
      );
      this.projectWorkTypeID = this.projectWorkTypeID || uuid.v1();
    }
  }
}
