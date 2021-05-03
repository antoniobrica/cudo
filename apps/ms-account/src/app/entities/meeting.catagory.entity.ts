import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './references.entity';
import * as uuid from 'uuid';


@Entity({ name: 'meetingCatagory' })

export class MeetingCatagoryEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  meetingCatagoryID: string;

  @Column()
  @Expose()
  meetingCatagoryTitle: string;


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


  constructor(meetingCatagoryEntity: Partial<MeetingCatagoryEntity>) {
    super();
    if (meetingCatagoryEntity) {
      Object.assign(
        this,
        plainToClass(MeetingCatagoryEntity, meetingCatagoryEntity, {
          excludeExtraneousValues: true
        })
      )
      this.meetingCatagoryID = this.meetingCatagoryID || uuid.v1();

    }
  }
}
