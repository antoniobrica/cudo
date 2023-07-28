import { Expose, plainToClass } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as uuid from 'uuid';

@Entity({name: "protocolFile"})
export default class ProtocolFileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({nullable: true})
    fileId: string;

    @Expose()
    @Column({unique: true})
    protocolFileId: string

    @Expose()
    @Column({nullable: true})
    protocolFileTitle: string;

    constructor(protocolFileEntity: Partial<ProtocolFileEntity>) {
        super();
        if (protocolFileEntity) {
            Object.assign(
                this,
                plainToClass(ProtocolFileEntity, protocolFileEntity, {
                    excludeExtraneousValues: true
                })
            )
            this.protocolFileId = this.protocolFileId || uuid.v1();
        }
    }

}