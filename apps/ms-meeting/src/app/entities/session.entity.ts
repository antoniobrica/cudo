import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, ManyToMany, UpdateDateColumn, ManyToOne, JoinTable } from 'typeorm';
import * as uuid from 'uuid';
import AdminEntity from './admin.entity';
import MembersEntity from './members.entity';
import ReferanceTypeEntity from './reference-type.entity';


@Entity({ name: 'session' })
export default class SessionEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    sessionID: string;

    @Expose()
    @Column({ nullable: true })
    sessionTitle: string;

    @Expose()
    @Column({ nullable: true })
    worktypeID: string;

    @Expose()
    @Column({ nullable: true })
    worktypeTitle: string;

    @Expose()
    @Column({ nullable: true })
    meetingCategoryID: string;

    @Expose()
    @Column({ nullable: true })
    meetingCategoryTitle: string;

    @Expose()
    @Column({ nullable: true })
    invitationID: string;

    @Expose()
    @Column({ nullable: true })
    invitationTitle: string;

    @Expose()
    @Column({ nullable: true })
    protocolID: string;

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
    @Column({ nullable: true, default: false })
    isDeleted?: boolean;

    @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.sessions)
    reference: ReferanceTypeEntity;

    @Expose()
    @ManyToMany(type => AdminEntity, { cascade: true })
    @JoinTable()
    admins: AdminEntity[];

    @Expose()
    // n:n relation with TaskFllowersEntity
    @ManyToMany(type => MembersEntity, { cascade: true })
    @JoinTable()
    members: MembersEntity[];

    constructor(sessionEntity: Partial<SessionEntity>) {
        super();
        if (sessionEntity) {
            Object.assign(
                this,
                plainToClass(SessionEntity, sessionEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.sessionID = this.sessionID || uuid.v1();

        }
    }
}