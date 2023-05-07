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

@Entity({ name: 'invitationTemplate' })
export class InvitationTemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  invitationTemplateID: string;

  @Column()
  @Expose()
  invitationTemplateTitle: string;

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
  reference: Relation<ReferanceTypeEntity>;

  constructor(invitationTemplateEntity: Partial<InvitationTemplateEntity>) {
    super();
    if (invitationTemplateEntity) {
      Object.assign(
        this,
        plainToClass(InvitationTemplateEntity, invitationTemplateEntity, {
          excludeExtraneousValues: true,
        })
      );
      this.invitationTemplateID = this.invitationTemplateID || uuid.v1();
    }
  }
}
