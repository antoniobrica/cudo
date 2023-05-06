import { Expose, plainToClass } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
} from 'typeorm';
import { BuildingTypeEntity } from './building-type.entity';
import { CompanyEntity } from './company.entity';
import { ProjectEntity } from './project.entity';
import { WorkTypeEntity } from './work-type.entity';

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
  @Column()
  referenceType: string;

  @Expose()
  @Column()
  name: string;

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

  // 1:n relation with TasksEntity
  @Expose()
  @OneToMany(() => ProjectEntity, (project: ProjectEntity) => project.reference)
  projects: Relation<ProjectEntity>[];

  // 1:n relation with TasksEntity
  @Expose()
  @OneToMany(() => WorkTypeEntity, (workType: WorkTypeEntity) => workType.reference)
  workTypes: Relation<WorkTypeEntity>[];

  @OneToMany(() => BuildingTypeEntity, (buildingType: BuildingTypeEntity) => buildingType.reference)
  buildingTypes: Relation<BuildingTypeEntity>[];
  // 1:n relation with TasksEntity
  @Expose()
  @OneToMany(() => CompanyEntity, (companyEntity: CompanyEntity) => companyEntity.reference)
  companies: Relation<CompanyEntity>[];

  constructor(referanceTypeEntity: Partial<ReferanceTypeEntity>) {
    super();
    if (referanceTypeEntity) {
      Object.assign(
        this,
        plainToClass(ReferanceTypeEntity, referanceTypeEntity, {
          excludeExtraneousValues: true,
        })
      );
    }
  }
}
