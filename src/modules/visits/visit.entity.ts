import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import {UserEntity} from "../users/user.entity";
import {BuildingEntity} from "../buldings/building.entity";
import {AchievementEntity} from "../achievements/achievement.entity";

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
        })
    @JoinColumn({name: 'building_id'})
    building: BuildingEntity;

    @ManyToOne(
        () => UserEntity,
        user => user.visits,
        {
            nullable: false
        })
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @OneToOne(
        () => AchievementEntity,
        (achievement) => achievement.visit,
    )
    achievement: AchievementEntity;
}