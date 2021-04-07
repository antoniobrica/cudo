import { Field, ObjectType } from "@nestjs/graphql";
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FileEntity } from "./file.entity";

@ObjectType()
@Entity({name: 'bkp'})
export class BKP {

    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    @Field()
    bkpTitle: string;

    @Field({nullable:true})
    @Column()
    BKPID: string;

    @OneToMany(type => FileEntity, file => file.bkp) // specify inverse side as a second parameter
    file: FileEntity[];
}