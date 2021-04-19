import { Field, ID, ObjectType } from "@nestjs/graphql";
import * as uuid from 'uuid';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TasksEntity } from "./tasks.entity";

@ObjectType()
@Entity({ name: 'phases' })
export class Phases {

    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    // @Field()
    // @Column({unique: true})
    // phaseId: string;

    @Column()
    @Field()
    phaseTitle: string;

    @Field()
    @Column()
    companyId: number;

    @Field()
    @Column()
    clientId: number;

}