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
import { IsOptional } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';
import * as uuid from 'uuid';
import ReferanceTypeEntity from './reference-type.entity';

@Entity({ name: 'comapanies' })
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  companyID: string;

  @Expose()
  @Column({ unique: true })
  companyName: string;

  @Expose()
  @Column()
  companyType: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;

  @Expose()
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.companies)
  reference: Relation<ReferanceTypeEntity>;

  constructor(companyEntity: Partial<CompanyEntity>) {
    super();
    if (companyEntity) {
      Object.assign(
        this,
        plainToClass(CompanyEntity, companyEntity, {
          excludeExtraneousValues: true,
        })
      );
      this.companyID = this.companyID || uuid.v1();
      // this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      // this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
