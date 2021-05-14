import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";

@Entity({ name: 'people' })
export class PeopleEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    userID: string;

    @Expose()
    @Column()
    userName: string;

    @Expose()
    @Column({nullable:true})
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

    @ManyToMany(type => FileEntity, projectfile => projectfile.people) // specify inverse side as a second parameter
    files: FileEntity[];

    constructor(peopleEntity: Partial<PeopleEntity>) {
        super();
        if (peopleEntity) {
            Object.assign(
                this,
                plainToClass(PeopleEntity, peopleEntity, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}