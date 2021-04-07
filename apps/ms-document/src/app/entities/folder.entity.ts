import { Field, ObjectType } from "@nestjs/graphql";
import {  Column, Entity,  ManyToMany,  OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FileEntity } from "./file.entity";

@ObjectType()
@Entity({name: 'folder'})
export class Folder {

    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    @Field({nullable: true})
    @Column()
    folderID: string;

    @Column({nullable: true})
    @Field()
    folderName: string;

    @Column({nullable: true})
    @Field()
    isFolder?: Boolean;

    @ManyToMany(type => FileEntity, file => file.folder) 
    file: FileEntity[];
}