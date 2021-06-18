import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import * as uuid from 'uuid';

/**
 * 
 */
@Entity({ name: 'meetingfile' })
export default class MeetingFilesEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ nullable: true })
    fileId: string;

    @Expose()
    @Column({ unique:true })
    meetingFileId: string;

    @Expose()
    @Column({ nullable: true })
    meetingFileTitle: string;


    constructor(meetingFilesEntity: Partial<MeetingFilesEntity>) {
        super();
        if (meetingFilesEntity) {
            Object.assign(
                this,
                plainToClass(MeetingFilesEntity, meetingFilesEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.meetingFileId = this.meetingFileId || uuid.v1();
        }
    }
}