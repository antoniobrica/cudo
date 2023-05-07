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
import ReferanceTypeEntity from './references.entity';

@Entity({ name: 'phase' })
export class PhaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  phaseID: string;

  @Column()
  @Expose()
  phaseTitle: string;

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
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.phase)
  reference: Relation<ReferanceTypeEntity>;

  constructor(phaseEntity: Partial<PhaseEntity>) {
    super();
    if (phaseEntity) {
      Object.assign(
        this,
        plainToClass(PhaseEntity, phaseEntity, {
          excludeExtraneousValues: true,
        })
      );
      this.phaseID = this.phaseID || uuid.v1();
      // this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      // this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
