import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';



@Entity({ name: 'file' })

export class fileEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  fileId: string;

  @Column({ unique: true })
  @Expose()
  url: string;

  @Column()
  @Expose()
  fileName: string;
}
