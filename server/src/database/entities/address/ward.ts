import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { District } from "./district";
import { AdministrativeUnit } from './administrativeUnit';
import Address from "."

@Entity()
export class Ward{
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
    @ManyToOne(()=> AdministrativeUnit, administrativeUnit => administrativeUnit.wards)
    @JoinColumn({name: "administrative_unit_id"})
    administrativeUnit: AdministrativeUnit;
    @ManyToOne(()=> District, district => district.wards)
    @JoinColumn({name: "district_code"})
    district: District;
    @OneToMany(()=> Address, add => add.ward)
    addresses: Address[];
}