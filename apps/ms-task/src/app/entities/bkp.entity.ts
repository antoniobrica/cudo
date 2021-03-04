import { Field, ID, ObjectType } from "@nestjs/graphql";
import { plainToClass } from "class-transformer";
import * as uuid from 'uuid';
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TasksEntity } from "./tasks.entity";

@ObjectType()
@Entity({name: 'bkp'})
export class BKP {

    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    // @Field()
    // @Column({unique: true})
    // bkpId: string;

    @Column()
    @Field()
    bkpTitle: string;

    @Field()
    @Column()
    companyId: number;

    @Field()
    @Column()
    clientId: number;

    @OneToMany(type => TasksEntity, task => task.bkp) // specify inverse side as a second parameter
    task: TasksEntity[];
}