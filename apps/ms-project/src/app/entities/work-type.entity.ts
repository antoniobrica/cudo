import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsOptional } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';
import * as uuid from 'uuid';
import ReferanceTypeEntity from './reference-type.entity';

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
  createdAt: Date

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date

  @Expose()
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.workTypes)
  reference: ReferanceTypeEntity;


  constructor(workTypeEntity: Partial<WorkTypeEntity>) {
    super();
    if (workTypeEntity) {
      Object.assign(
        this,
        plainToClass(WorkTypeEntity, workTypeEntity, {
          excludeExtraneousValues: true
        })
      )
      // this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      // this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
