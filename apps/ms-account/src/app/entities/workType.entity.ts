import { ObjectType } from '@nestjs/graphql';
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
import ReferanceTypeEntity from './references.entity';
import * as uuid from 'uuid';

@ObjectType()
@Entity({ name: 'worktype' })
export class WorkTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Expose()
  @Column({ nullable: true })
  workTypeID?: string;

  @Expose()
  @Column({ nullable: true })
  workTypeTitle?: string;

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
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.worktype)
  reference: Relation<ReferanceTypeEntity>;

  constructor(worktypeEntity: Partial<WorkTypeEntity>) {
    super();
    if (worktypeEntity) {
      Object.assign(
        this,
        plainToClass(WorkTypeEntity, worktypeEntity, {
          excludeExtraneousValues: true,
        })
      );
      this.workTypeID = this.workTypeID || uuid.v1();
    }
  }
}
