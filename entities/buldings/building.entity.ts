import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../users/user.entity";

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @ManyToOne(() => UserEntity, user => user.buildings) // Assuming UserEntity will have a buildings collection
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}