import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BuildingEntity} from "./building.entity";
import {Repository} from "typeorm";
import {CreateBuildingDto} from "./utils/interfaces/create-building-dto";


@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(BuildingEntity) private readonly buildingRepo: Repository<BuildingEntity>,
    ) {
    }

    public async createBuilding(building_body: CreateBuildingDto): Promise<BuildingEntity> {
        const building = this.buildingRepo.create(building_body)

        const created_building = this.getBuildingByName(building.name)

        if (created_building) {
            throw new HttpException('Building with such name has already been registered', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.buildingRepo.save(building)

        } catch (error) {
            throw error;
        }
    }

    public getBuildingById(building_id: number): Promise<BuildingEntity> {
        return this.buildingRepo.findOneBy({
            id: building_id
        })
    }

    public getBuildingByName(building_name: string): Promise<BuildingEntity> {
        return this.buildingRepo.findOneBy({
            name: building_name
        })
    }


    public async getBuildings(): Promise<BuildingEntity[]> {
        return await this.buildingRepo.find()
    }
}