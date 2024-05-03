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

    @Column()
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
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    // Adding the ManyToOne relationship
    @ManyToOne(() => UserEntity, user => user.buildings)
    @JoinColumn({name: 'created_by_user_id'}) // This column will store the reference to UserEntity
    createdBy: UserEntity;


    @OneToMany(() => VisitEntity, visit => visit.building) // Define the reverse relation
    visits: VisitEntity[];

    @OneToMany(() => MessageEntity, message => message.building) // Define the reverse relation
    messages: MessageEntity[];
}