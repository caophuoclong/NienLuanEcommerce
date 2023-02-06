import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "./province";

@Entity()
export class AdministrativeRegion{
    @PrimaryColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    name_en: string;
    @Column()
    code_name: string;
    @Column()
    code_name_en: string;
    @OneToMany(()=> Province, province => province.administrativeRegion)
    provinces: Province[]
    
}