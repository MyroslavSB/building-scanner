import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EUserRoles} from "./utils/enums/e-user-roles";
import {BuildingEntity} from "../buldings/building.entity";

@Entity({name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: EUserRoles,
        default: EUserRoles.USER
    })
    role: EUserRoles;


    @OneToMany(() => BuildingEntity, building => building.user)
    buildings: BuildingEntity[];
}