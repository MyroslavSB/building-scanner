import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EUserRoles} from "./utils/enums/e-user-roles";
import {BuildingEntity} from "../buldings/building.entity";
import {VisitEntity} from "../visits/visit.entity";
import {MessageEntity} from "../messages/message.entity";
import {AchievementEntity} from "../achievements/achievement.entity";

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

    @OneToMany(() => BuildingEntity, building => building.created_by)
    buildings: BuildingEntity[];

    @OneToMany(() => VisitEntity, visit => visit.user)
    visits: VisitEntity[];

    @OneToMany(() => MessageEntity, message => message.building)
    messages: MessageEntity[];

    @OneToMany(
        () => AchievementEntity,
        achievement => achievement.user
    )
    achievements: AchievementEntity[];
}