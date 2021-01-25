import { BeforeInsert, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

@Entity({ name: 'projects' })
export class ProjectEntity {
  @ObjectIdColumn()
  _id: string;
  @Column({
    type: 'string',
    unique: true,
  })
  email: string;

  @Column({
    type: 'number',
  })
  age: number;
  
  @PrimaryColumn({
    type: 'string',
  })
  projectId: string;

  @Column({ type: 'boolean', })
  isSubscribed?: boolean;
}
