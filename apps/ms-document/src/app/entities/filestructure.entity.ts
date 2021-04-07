import { Field, ObjectType } from "@nestjs/graphql";
import {  BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FileEntity } from "./file.entity";
import { ProjectFileEntity } from "./projectfile.entity";

@ObjectType()
@Entity({name: 'filestructure'})
export class FileStructureEntity extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    filestructureID: number;

    @Column()
    @Field()
    structureTitle: string;

    @Field()
    @Column()
    structureId: string;

    @OneToMany(type => FileEntity, projectfile => projectfile.filestructure) // specify inverse side as a second parameter
    projectfile: FileEntity[];

}