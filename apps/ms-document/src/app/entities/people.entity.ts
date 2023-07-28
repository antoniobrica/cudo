import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as uuid from 'uuid';
import { UploadedFilesEntity } from "./uploaded-files.entity";
@Entity({ name: 'people' })
export class PeopleEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    filePeopleID: string;

    @Expose()
    @Column()
    userID: string;

    @Expose()
    @Column()
    userName: string;

    @Expose()
    @Column({ nullable: true })
    imageUrl: string;

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

    @ManyToMany(type => UploadedFilesEntity, projectfile => projectfile.people) // specify inverse side as a second parameter
    files: UploadedFilesEntity[];

    constructor(peopleEntity: Partial<PeopleEntity>) {
        super();
        if (peopleEntity) {
            Object.assign(
                this,
                plainToClass(PeopleEntity, peopleEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.filePeopleID = this.filePeopleID || uuid.v1();
        }
    }
}