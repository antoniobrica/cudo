import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn, getMongoRepository, UpdateDateColumn, JoinColumn } from 'typeorm';
import * as uuid from 'uuid';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './reference-type.entity';
import TaskAssigneessEntity from './task-assignees.entity';
import TaskFllowersEntity from './task-followers.entity';
import TaskFileEntity from './task-file.entity';
import { SubTaskEntity } from './subtask.entity';

@Entity({
  name: 'tasks',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class TasksEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  taskID: string;

  @Expose()
  @Column({ nullable: true })
  taskTitle?: string;

  @Expose()
  @Column({ nullable: true })
  BKPID?: string;

  @Expose()
  @Column({ nullable: true })
  phaseID?: string;

  @Expose()
  @Column({ nullable: true })
  BKPTitle?: string;

  @Expose()
  @Column({ nullable: true })
  phaseName?: string;

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
  description?: string;

  @Expose()
  @Column({ nullable: true })
  sendNotification?: boolean;

  @Expose()
  @Column({ nullable: true })
  saveTaskAsTemplate?: string;

  @Expose()
  @CreateDateColumn()
  createdAt?: Date;

  @Expose()
  @Column({ nullable: true })
  createdBy?: string;

  @Expose()
  @UpdateDateColumn()
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


  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.tasks)
  reference: ReferanceTypeEntity;

  @Expose()
  // n:n relation with TaskAssigneessEntity
  @ManyToMany(type => TaskAssigneessEntity, { cascade: true })
  @JoinTable()
  assignees: TaskAssigneessEntity[];

  @Expose()
  // n:n relation with TaskAssigneessEntity
  @ManyToMany(type => TaskFileEntity, { cascade: true })
  @JoinTable()
  files: TaskFileEntity[];

  @Expose()
  // n:n relation with TaskFllowersEntity
  @ManyToMany(type => TaskFllowersEntity, { cascade: true })
  @JoinTable()
  followers: TaskFllowersEntity[];

  @Expose()
  // n:n relation with TaskAssigneessEntity
  @ManyToMany(type => SubTaskEntity, { cascade: true })
  @JoinTable()
  subtasks: SubTaskEntity[];


  constructor(projectTasksEntity: Partial<TasksEntity>) {
    super();
    if (projectTasksEntity) {
      Object.assign(
        this,
        plainToClass(TasksEntity, projectTasksEntity, {
          excludeExtraneousValues: true
        })
      )
      this.taskID = this.taskID || uuid.v1();
    }
  }

}
