import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './reference-type.entity';
import { ProjectEntity } from './project.entity';
import { ProjectWorkTypeEntity } from './project-WorkType.entity';

@Entity({ name: 'workTypes' })
export class WorkTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  workTypeID: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;

  @Expose()
  @Column({ nullable: true })
  isDeleted?: boolean;

  @Expose()
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.workTypes)
  reference: Relation<ReferanceTypeEntity>;

  @Expose()
  @OneToMany(() => ProjectWorkTypeEntity, (project: ProjectWorkTypeEntity) => project.workType)
  projectWorkTypes?: Relation<ProjectEntity>[];

  constructor(workTypeEntity: Partial<WorkTypeEntity>) {
    super();
    if (workTypeEntity) {
      Object.assign(
        this,
        plainToClass(WorkTypeEntity, workTypeEntity, {
          excludeExtraneousValues: true,
        })
      );
    }
  }
}
