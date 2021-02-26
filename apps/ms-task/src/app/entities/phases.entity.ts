import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({name: 'phases'})
export class Phases {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    Id: string;

    @Field()
    @Column('uuid')
    phaseId: string;

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