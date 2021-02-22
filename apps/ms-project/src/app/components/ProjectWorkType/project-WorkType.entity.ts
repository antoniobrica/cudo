import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from '../../entities/reference-type.entity';


@Entity({ name: 'workTypes' })

export class ProjectWorkTypeEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  projectWorkTypeID: string;

  @Expose()
  @Column()
  estimatedCost: number;

  @Expose()
  @CreateDateColumn()
  createdAt: Date

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date

  @Expose()
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.projectworkTypes)
  reference: ReferanceTypeEntity;


  constructor(proejctWorkTypeEntity: Partial<ProjectWorkTypeEntity>) {
    super();
    if (proejctWorkTypeEntity) {
      Object.assign(
        this,
        plainToClass(ProjectWorkTypeEntity, proejctWorkTypeEntity, {
          excludeExtraneousValues: true
        })
      )
      // this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      // this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
