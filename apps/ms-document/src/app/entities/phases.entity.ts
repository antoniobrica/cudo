import { Field, ObjectType } from "@nestjs/graphql";
import {  Column, Entity,  ManyToMany,  OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FileEntity } from "./file.entity";

@ObjectType()
@Entity({name: 'phases'})
export class Phases {

    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    @Field()
    @Column()
    phaseId: number;

    @Column()
    @Field()
    phaseTitle: string;

    @ManyToMany(type => FileEntity, file => file.phase) 
    file: FileEntity[];
}