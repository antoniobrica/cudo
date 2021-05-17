import { Field, ID, ObjectType } from "@nestjs/graphql";
import * as uuid from 'uuid';
import {  BaseEntity, Column, Entity,  ManyToMany,  OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MileStoneEntity } from "./milestone.entity";
import { Expose, plainToClass } from "class-transformer";

@ObjectType()
@Entity({name: 'worktype'})
export class WorkTypeEntity extends BaseEntity{


    @PrimaryGeneratedColumn()
    Id: number;

    @Expose()
    @Column({ nullable: true })
    workTypeID?: string;

    @Expose()
    @Column({ nullable: true })
    workTypeTitle?: string;

    @OneToOne(type => MileStoneEntity, milestone => milestone) 
    milestone: MileStoneEntity[];

    constructor(worktypeEntity: Partial<WorkTypeEntity>) {
        super();
        if (worktypeEntity) {
            Object.assign(
                this,
                plainToClass(WorkTypeEntity, worktypeEntity, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}