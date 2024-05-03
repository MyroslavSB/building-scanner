import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EUserRoles} from "./utils/enums/e-user-roles";
import {BuildingEntity} from "../buldings/building.entity";
import {VisitEntity} from "../visits/visit.entity";

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

    // Adding OneToMany relationship
    @OneToMany(() => BuildingEntity, building => building.createdBy)
    buildings: BuildingEntity[];

    @OneToMany(() => VisitEntity, visit => visit.user) // Define the reverse relation
    visits: VisitEntity[];
}