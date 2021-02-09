import { BaseEntity, BeforeInsert, Column, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsOptional } from 'class-validator';


@ObjectType()
@Entity({ name: 'projects' })

export class ProjectEntity {
  @Field()
  @Column({unique:true})
  @PrimaryColumn()
  projectId: string;

  @Field()
  @Column({unique:true})
  projectName: string;
  
  @Field()
  @Column({unique:true})
  projectNum:number

  @Field()
  @Column()
  client: string;

  @Field()
  @Column({nullable:true})
  buildingType?: string;

  @Field()
  @Column({nullable: true})
  printingCom?: string;

  @Field()
  @Column({nullable: true})
  workType?: string;

  @Field()
  @Column({nullable: true})
  estCost?: number;

  @Field()
  @Column({nullable: true})
  adressLine1?: string;

  @Field()
  @Column({nullable: true})
  adressLine2?: string;

  @Field()
  @Column({nullable: true})
  city?: string;

  @Field()
  @Column({nullable: true})
  state?: string;

  @Field()
  @Column({nullable: true})
  zip?: number;

  @Field()
  @Column({nullable: true})
  country?: string;

  @Field()
  @Column({nullable: true})
  description?: string;
}
