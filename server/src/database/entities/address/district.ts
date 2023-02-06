import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { Ward } from "./ward";
import { AdministrativeUnit } from './administrativeUnit';
import { Province } from "./province";

@Entity()
export class District{
    @PrimaryColumn()
    code: string;
    @Column()
    name: string;
    @Column()
    name_en: string;
    @Column()
    full_name: string;
    @Column()
    full_name_en: string;
    @Column()
    code_name: string;
    @ManyToOne(()=> AdministrativeUnit, administrativeUnit => administrativeUnit.districts)
    @JoinColumn({name: "administrative_unit_id"})
    administrativeUnit: AdministrativeUnit;
    @ManyToOne(()=> Province, province => province.districts)
    @JoinColumn({name: "province_code"})
    province: Province;
    @OneToMany(()=> Ward, ward => ward.district)
    wards: Ward[];
}