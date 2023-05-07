import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import * as uuid from 'uuid';
import ReferanceTypeEntity from './references.entity';

@Entity({ name: 'bkp' })
export class BkpEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  bkpID: string;

  @Column()
  @Expose()
  bkpTitle: string;

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
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.bkp)
  reference: Relation<ReferanceTypeEntity>;

  constructor(bkpEntity: Partial<BkpEntity>) {
    super();
    if (bkpEntity) {
      Object.assign(
        this,
        plainToClass(BkpEntity, bkpEntity, {
          excludeExtraneousValues: true,
        })
      );
      // this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      // this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
