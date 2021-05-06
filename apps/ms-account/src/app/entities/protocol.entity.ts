import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './references.entity';
import * as uuid from 'uuid';


@Entity({ name: 'protocolTemplate' })

export class ProtocolEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  protocolTemplateID: string;

  @Column()
  @Expose()
  protocolTemplateTitle: string;


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
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.folder)
  reference: ReferanceTypeEntity;


  constructor(protocolEntity: Partial<ProtocolEntity>) {
    super();
    if (protocolEntity) {
      Object.assign(
        this,
        plainToClass(ProtocolEntity, protocolEntity, {
          excludeExtraneousValues: true
        })
      )
      this.protocolTemplateID = this.protocolTemplateID || uuid.v1();

    }
  }
}
