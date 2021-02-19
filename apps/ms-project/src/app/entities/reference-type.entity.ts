import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as uuid from 'uuid';
import { CompanyEntity } from './company.entity';
import { ProjectEntity } from './project.entity';
import { WorkTypeEntity } from './work-type.entity';

/**
 * 
 */
@Entity({ name: 'references' })
export default class ReferanceTypeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    referenceID: string;

    @Expose()
    @Column()
    referenceType: string;

    @Expose()
    @Column()
    name: string;

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

    // 1:n relation with TasksEntity 
    @Expose()
    @OneToMany(() => ProjectEntity, (project: ProjectEntity) => project.reference)
    projects: ProjectEntity[];

    // 1:n relation with TasksEntity 
    @Expose()
    @OneToMany(() => WorkTypeEntity, (workType: WorkTypeEntity) => workType.reference)
    workTypes: WorkTypeEntity[];

    // 1:n relation with TasksEntity 
    @Expose()
    @OneToMany(() => CompanyEntity, (companyEntity: CompanyEntity) => companyEntity.reference)
    companies: CompanyEntity[];

    constructor(referanceTypeEntity: Partial<ReferanceTypeEntity>) {
        super();
        if (referanceTypeEntity) {
            Object.assign(
                this,
                plainToClass(ReferanceTypeEntity, referanceTypeEntity, {
                    excludeExtraneousValues: true
                })
            )
            // this.createdAt = this.createdAt || new Date(new Date().toUTCString());
            // this.updatedAt = new Date(new Date().toUTCString());
        }
    }
}