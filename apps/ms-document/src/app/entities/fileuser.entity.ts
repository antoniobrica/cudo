import { Field, ObjectType } from "@nestjs/graphql";
import {  Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectFileEntity } from "./projectfile.entity";

@ObjectType()
@Entity({name: 'fileuser'})
export class FileUserEntity {

    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    @Field()
    userName: string;

    @Field()
    @Column()
    userId: number;

    @ManyToMany(type => ProjectFileEntity, projectfile => projectfile.fileuser) // specify inverse side as a second parameter
    projectfile: ProjectFileEntity[];
}