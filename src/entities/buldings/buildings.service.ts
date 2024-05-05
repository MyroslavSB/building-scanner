import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BuildingEntity} from "./building.entity";
import {Repository} from "typeorm";
import {ICreateBuildingBody} from "./utils/interfaces/i-create-building-body";

@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(BuildingEntity) private readonly buildingRepo: Repository<BuildingEntity>
    ) {
    }

    public async createBuilding(building_body: ICreateBuildingBody): Promise<BuildingEntity> {
        const building = this.buildingRepo.create(building_body)

        try {
            return await this.buildingRepo.save(building);
        } catch (error) {
            // Check the error type to see if it is a duplicate entry
            if (error.code === 'ER_DUP_ENTRY' || error.driverError?.code === 'ER_DUP_ENTRY') {
                // You can customize the error message as needed
                throw new HttpException('This email is already registered.', HttpStatus.BAD_REQUEST);
            }
            // Rethrow the error if it's not related to duplicate entry
            throw error;
        }
    }

    public getBuildingById(building_id: number): Promise<BuildingEntity> {
        return this.buildingRepo.findOneBy({
            id: building_id
        })
    }

    public async getBuildings(): Promise<BuildingEntity[]> {
        return await this.buildingRepo.find()
    }
}