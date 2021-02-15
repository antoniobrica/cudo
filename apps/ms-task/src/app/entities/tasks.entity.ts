import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn, getMongoRepository } from 'typeorm';
import ReferanceTypeEntity from './reference-type.entity';
import TaskAssigneessEntity from './task-assignees.entity';
import TaskFllowersEntity from './task-followers.entity';
import * as uuid from 'uuid'
import { Expose, plainToClass } from 'class-transformer'
import { Logger } from '@nestjs/common';

@Entity({
  name: 'ProjectTasks',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class TasksEntity extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Expose()
  @Column({ unique: true })
  taskID: string;

  @Expose()
  @Column({ nullable: true })
  taskTitle?: string;

  @Expose()
  @Column({ nullable: true })
  startDate?: Date;

  @Expose()
  @Column({ nullable: true })
  endDate?: Date;

  @Expose()
  @Column({ nullable: true })
  estimatedDays?: string;

  @Expose()
  @Column({ nullable: true })
  sendNotification?: string;

  @Expose()
  @Column({ nullable: true })
  saveTaskAsTemplate?: string;

  @Expose()
  @Column({ nullable: true })
  BKPID?: string;

  @Expose()
  @Column({ nullable: true })
  phasesID?: string;

  @Expose()
  @Column()
  createdAt?: Date;

  @Expose()
  @Column({ nullable: true })
  createdBy?: string;

  @Expose()
  @Column()
  updatedAt?: Date;

  @Expose()
  @Column({ nullable: true })
  updatedBy?: string;

  @Expose()
  @Column({ nullable: true })
  isDeleted?: boolean;

  @Expose()
  @Column({ nullable: true })
  status?: string;

  @Expose()
  // n:1 relation with ReferanceTypeEntity
  @ManyToOne(type => ReferanceTypeEntity, referance => referance.tasks)
  referance: ReferanceTypeEntity;

  @Expose()
  // n:n relation with TaskAssigneessEntity
  @ManyToMany(type => TaskAssigneessEntity)
  @JoinTable()
  assignees: TaskAssigneessEntity[];

  @Expose()
  // n:n relation with TaskFllowersEntity
  @ManyToMany(type => TaskFllowersEntity)
  @JoinTable()
  followers: TaskFllowersEntity[];

  constructor(projectTasksEntity: Partial<TasksEntity>) {
    super();
    if (projectTasksEntity) {
      Object.assign(
        this,
        plainToClass(TasksEntity, projectTasksEntity, {
          excludeExtraneousValues: true
        })
      )
      this._id = this._id || uuid.v1();
      this.taskID = this.taskID || uuid.v1();
      this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      this.updatedAt = new Date(new Date().toUTCString());
    }
  }

}
