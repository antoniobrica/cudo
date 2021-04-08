import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import ReferanceTypeEntity from './references.entity';


@Entity({ name: 'folder' })

export class FolderEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  folderID: string;

  @Column()
  @Expose()
  folderTitle: string;


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
  @ManyToOne(() => ReferanceTypeEntity, (reference: ReferanceTypeEntity) => reference.folder)
  reference: ReferanceTypeEntity;


  constructor(folderEntity: Partial<FolderEntity>) {
    super();
    if (folderEntity) {
      Object.assign(
        this,
        plainToClass(FolderEntity, folderEntity, {
          excludeExtraneousValues: true
        })
      )
      // this.createdAt = this.createdAt || new Date(new Date().toUTCString());
      // this.updatedAt = new Date(new Date().toUTCString());
    }
  }
}
