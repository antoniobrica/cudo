import { Expose, plainToClass } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as uuid from 'uuid';
import ProtocolFileEntity from "./protocol-file.entity";
import MeetingEntity from "./meeting.entity";

@Entity({ name: "protocol" })
export default class ProtocolEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Expose()
    @Column()
    public companyId: string;

    @Expose()
    @Column()
    public projectTypeId: string;

    @Expose()
    @Column()
    public workTypeId: string;

    @Expose()
    @Column()
    public sessionId: string;

    @Expose()
    @Column()
    public protocolId: string;

    @Expose()
    @Column()
    public protocolTitle: string;

    @Expose()
    @CreateDateColumn()
    public protocolDate: Date;

    @Expose()
    @CreateDateColumn()
    public protocolStartTime: Date;

    @Expose()
    @CreateDateColumn()
    public protocolEndTime: Date;

    @Expose()
    @Column()
    public protocolDuration: string;

    @Expose()
    @Column()
    public protocolDescription: string;

    @Expose()
    @Column({nullable: true})
    meetingId: string;

    @Expose()
    @Column({ nullable: true })
    public createdBy?: string;

    @Expose()
    @UpdateDateColumn()
    public updatedAt?: Date;

    @Expose()
    @Column({ nullable: true })
    public updatedBy?: string;

    @Expose()
    @Column({ nullable: true, default: false })
    public isDeleted?: boolean;

    @Expose()
    // n:n relation with ProtocolEntity:ProtocolFilesEntity
    @ManyToMany(type => ProtocolFileEntity, { cascade: true })
    @JoinTable()
    protocolFiles?: ProtocolFileEntity[];

    @Expose()
    // n:n relation with ProtocolEntity:MeetingEntity
    @ManyToMany(type => MeetingEntity, {cascade:true})
    @JoinTable()
    meetings:MeetingEntity[]

    @Expose()
    @Column({ nullable: true })
    status?: string;

    constructor(protocolEntity: Partial<ProtocolEntity>) {
        super();
        if (protocolEntity) {
            Object.assign(
                this,
                plainToClass(ProtocolEntity, protocolEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.protocolId = this.protocolId || uuid.v1();
        }
    }

}