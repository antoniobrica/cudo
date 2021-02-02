import { BeforeInsert, Column, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

@Entity({ name: 'projects' })
export class ProjectEntity {
  // @ObjectIdColumn()
  // _id: string;
  // @Column({
  //   type: 'string',
  //   unique: true,
  // })
  // email: string;

  // @Column({
  //   type: 'number',
  // })
  // age: number;
  
  // @PrimaryColumn({
  //   type: 'string',
  // })
  // projectId: string;

  // @Column({ type: 'boolean', })
  // isSubscribed?: boolean;
  @PrimaryGeneratedColumn()
  _id: number;

 @Column({ nullable: true})
  projectId: string;

  @Column({ length: 500 })
  email: string;

  @Column('int')
  age: number;

  @Column({ nullable: true})
  isSubscribed?: boolean;
}
