import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Province } from './province';
import { District } from './district';
import { Ward } from './ward';

@Entity()
export class AdministrativeUnit{
    @PrimaryColumn()
    id: number;
    @Column()
    full_name: string;
    @Column()
    full_name_en: string;
    @Column()
    short_name: string;
    @Column()
    short_name_en: string;
    @Column()
    code_name: string;
    @Column()
    code_name_en: string;
    @OneToMany(()=> Province, province => province.administrativeUnit)
    provinces: Province[]
    @OneToMany(() => District, district => district.administrativeUnit)
    districts: District[]
    @OneToMany(()=> Ward, ward => ward.administrativeUnit)
    wards: Ward[]
}