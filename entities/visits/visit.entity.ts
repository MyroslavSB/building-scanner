import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import {UserEntity} from "../users/user.entity";
import {BuildingEntity} from "../buldings/building.entity";

@Entity({name: 'visit'})
export class VisitEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name: 'visit_date'})
    visit_date: string;

    @ManyToOne(
        () => BuildingEntity,
        building => building.visits,
        {
            nullable: false
        }) // Optionally define the reverse relation
    @JoinColumn({name: 'building_id'})
    building: BuildingEntity;

    @ManyToOne(
        () => UserEntity,
        user => user.visits,
        {
            nullable: false
        }) // Optionally define the reverse relation
    @JoinColumn({name: 'user_id'})
    user: UserEntity;
}