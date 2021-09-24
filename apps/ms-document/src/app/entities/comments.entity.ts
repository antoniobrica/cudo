import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as uuid from 'uuid';

/**
 * 
 */
@Entity({ name: 'comments' })
export default class CommentsEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    commentsID: string;

    @Expose()
    @Column()
    uploadedFileID: string;

    @Expose()
    @Column()
    comment: string;

    @Expose()
    @Column({ nullable: true })
    createdBy?: string;

    @Expose()
    @Column({ nullable: true })
    createdByEmail?: string;

    @Expose()
    @Column({ nullable: true })
    createdByUrl?: string;

    @Expose()
    @CreateDateColumn()
    createdAt?: Date;

    @Expose()
    @UpdateDateColumn()
    updatedAt?: Date;

    @Expose()
    @Column({ nullable: true })
    isDeleted?: boolean;

    constructor(commentsEntity: Partial<CommentsEntity>) {
        super();
        if (commentsEntity) {
            Object.assign(
                this,
                plainToClass(CommentsEntity, commentsEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.commentsID = this.commentsID || uuid.v1();
        }
    }
}