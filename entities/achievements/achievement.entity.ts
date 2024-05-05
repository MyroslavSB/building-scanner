import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne, OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {UserEntity} from "../users/user.entity";
import {VisitEntity} from "../visits/visit.entity";

@Entity({name: 'achievement'})
export class AchievementEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name: 'obtained_date'})
    obtained_date: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(
        () => UserEntity,
        user => user.achievements,
        {nullable: false}
    )
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @OneToOne(() => VisitEntity, (visit) => visit.achievement)
    @JoinColumn({ name: 'visit_id' }) // Foreign key for visit
    visit: VisitEntity;


}