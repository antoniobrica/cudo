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
import * as uuid from 'uuid';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './reference.entity';
import { Field } from '@nestjs/graphql';

@Entity({
  name: 'bkp',
  orderBy: {
    createdAt: 'ASC',
  },
})
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
  @ManyToOne(
    () => ReferanceTypeEntity,
    (reference: ReferanceTypeEntity) => reference.bkps
  )
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
