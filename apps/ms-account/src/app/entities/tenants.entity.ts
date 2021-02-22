import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn } from 'typeorm';
import * as uuid from 'uuid';

/**
 * 
 */
@Entity({ name: 'tenants' })
export default class TenantsEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    tenantID: string;

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

    // 1:n relation with TasksEntity 
    // @Expose()
    // @OneToMany(() => TasksEntity, (task: TasksEntity) => task.reference)
    // tasks: TasksEntity[];

    constructor(tenantsEntity: Partial<TenantsEntity>) {
        super();
        if (tenantsEntity) {
            Object.assign(
                this,
                plainToClass(TenantsEntity, tenantsEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.tenantID = this.tenantID || uuid.v1();
            this.createdAt = this.createdAt || new Date(new Date().toUTCString());
            this.updatedAt = new Date(new Date().toUTCString());
        }
    }
}