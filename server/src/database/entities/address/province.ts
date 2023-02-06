import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { AdministrativeUnit } from "./administrativeUnit";
import { AdministrativeRegion } from './administrativeRegion';
import { District } from "./district";

@Entity()
export class Province{
    @PrimaryColumn()
    code: string;
    @Column()
    name: string;
    @Column()
    name_en: string;
    @Column()
    full_name_en: string;
    @Column()
    full_name: string;
    @Column()
    code_name: string;
    @ManyToOne(()=>AdministrativeUnit, administrativeUnit => administrativeUnit.provinces)
    @JoinColumn({name: "administrative_unit_id"})
    administrativeUnit: AdministrativeUnit;
    @ManyToOne(()=> AdministrativeRegion, administativeRegion => administativeRegion.provinces)
    @JoinColumn({name: "administrative_region_id"})
    administrativeRegion: AdministrativeRegion
    @OneToMany(()=> District, district => district.province)
    districts: District[]

}