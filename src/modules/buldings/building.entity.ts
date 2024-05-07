import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../users/user.entity";
import {VisitEntity} from "../visits/visit.entity";
import {MessageEntity} from "../messages/message.entity";

@Entity({name: 'building'})
export class BuildingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column()
    description: string;

    @Column({type: 'json'})
    location: {
        latitude: number;
        longitude: number;
    }

    @Column({unique: true, default: null})
    qr_code: string;

    @CreateDateColumn({name: 'created_at'})
    created_at: string;

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: string;


    @ManyToOne(() => UserEntity, user => user.buildings)
    @JoinColumn({name: 'user_id'}) // This column will store the reference to UserEntity
    created_by: UserEntity;

    @OneToMany(() => VisitEntity, visit => visit.building) // Define the reverse relation
    visits: VisitEntity[];

    @OneToMany(() => MessageEntity, message => message.building) // Define the reverse relation
    messages: MessageEntity[];
}