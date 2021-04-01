import { Field, ObjectType } from "@nestjs/graphql";
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectFileEntity } from "./projectfile.entity";

@ObjectType()
@Entity({name: 'filestructure'})
export class FileStructureEntity {

    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    @Field()
    structureTitle: string;

    @Field()
    @Column()
    structureId: number;

    @OneToMany(type => ProjectFileEntity, projectfile => projectfile.filestructure) // specify inverse side as a second parameter
    projectfile: ProjectFileEntity[];
}