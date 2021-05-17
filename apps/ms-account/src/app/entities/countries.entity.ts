import { Expose, plainToClass } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, } from 'typeorm';

/**
 * 
 */
@Entity({ name: 'countries' })
export default class CountriesEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ unique: true })
    countryName: string;

    @Expose()
    @Column({ unique: true })
    countryCode: string;


    constructor(countriesEntity: Partial<CountriesEntity>) {
        super();
        if (countriesEntity) {
            Object.assign(
                this,
                plainToClass(CountriesEntity, countriesEntity, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}