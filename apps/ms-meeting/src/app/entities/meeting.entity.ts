import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, ManyToMany, UpdateDateColumn, ManyToOne, JoinTable } from 'typeorm';
import * as uuid from 'uuid';
import MembersEntity from './members.entity';
import ReferanceTypeEntity from './reference-type.entity';
import MeetingFilesEntity from './meeting-files.entity';

@Entity({ name: 'meeting' })
export default class MeetingEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    companyId: string;
    
    @Expose()
    @Column()
    projectTypeId: string;
    
    @Expose()
    @Column()
    workTypeId: string;

    @Expose()
    @Column()
    sessionId: string;

    @Expose()
    @Column({ unique: true })
    meetingId: string;

    @Expose()
    @Column({ nullable: true })
    meetingTitle: string;

    @Expose()
    @CreateDateColumn()
    meetingDate: Date;

    @Expose()
    @CreateDateColumn()
    meetingStartTime: Date;

    @Expose()
    @CreateDateColumn()
    meetingEndTime: Date;

    @Expose()
    @Column({ nullable: true })
    inviteGuests?: string;
    
    @Expose()
    @Column({ nullable: true })
    meetingDescription?: string;

    @Expose()
    @Column({ nullable: true })
    protocolId: string;

    @Expose()
    @Column()
    protocolTitle: string;

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

    // @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.meetings)
    // reference: ReferanceTypeEntity;

    @Expose()
    // n:n relation with MeetingEntity:MembersEntity
    @ManyToMany(type => MembersEntity, { cascade: true })
    @JoinTable()
    members: MembersEntity[];

    @Expose()
    // n:n relation with MeetingEntity:MeetingFilesEntity
    @ManyToMany(type => MeetingFilesEntity, { cascade: true })
    @JoinTable()
    meetingFiles?: MeetingFilesEntity[];


    constructor(meetingEntity: Partial<MeetingEntity>) {
        super();
        if (meetingEntity) {
            Object.assign(
                this,
                plainToClass(MeetingEntity, meetingEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.meetingId = this.meetingId || uuid.v1();
        }
    }
}