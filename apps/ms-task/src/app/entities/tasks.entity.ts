import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn, getMongoRepository, OneToOne, JoinColumn } from 'typeorm';
import ReferanceTypeEntity from './reference-type.entity';
import * as uuid from 'uuid';
import { Expose, plainToClass } from 'class-transformer';
import { BKP } from './bkp.entity';
import { Phases } from './phases.entity';

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

  // @Expose()
  // @Column({ nullable: true })
  // BKPID?: string;

  // @Expose()
  // @Column({ nullable: true })
  // phasesID?: string;

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


  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.tasks)
  reference: ReferanceTypeEntity;

  @ManyToOne(type => BKP, bkp => bkp.task) // specify inverse side as a second parameter
  @JoinColumn()
  bkp: BKP;


  @ManyToOne(type => Phases, phase => phase.task) // specify inverse side as a second parameter
  @JoinColumn()
  phase: Phases;


  // @Expose()
  // // n:n relation with TaskAssigneessEntity
  // @ManyToMany(type => TaskAssigneessEntity)
  // @JoinTable()
  // assignees: TaskAssigneessEntity[];

  // @Expose()
  // // n:n relation with TaskFllowersEntity
  // @ManyToMany(type => TaskFllowersEntity)
  // @JoinTable()
  // followers: TaskFllowersEntity[];

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
      this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      this.updatedAt = new Date(new Date().toUTCString());
    }
  }

}
