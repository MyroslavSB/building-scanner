import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

    @Column({unique: true})
    qr_code: string;
}