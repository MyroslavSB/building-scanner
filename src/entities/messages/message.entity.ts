import {
    Column, CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {UserEntity} from "../users/user.entity";
import {BuildingEntity} from "../buldings/building.entity";

@Entity({name: 'message'})
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => BuildingEntity,
            building => building.messages,
        {
            nullable: false
        }
    ) // Optionally define the reverse relation
    @JoinColumn({ name: 'building_id' })
    building: BuildingEntity;

    @ManyToOne(
        () => UserEntity,
            user => user.messages,
        {
            nullable: false
        }
    ) // Optionally define the reverse relation
    @JoinColumn({ name: 'user_id',})
    user: UserEntity;

    @Column({nullable: false})
    text: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

}