import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BuildingEntity} from "./building.entity";
import {Repository} from "typeorm";
import {CreateBuildingDto} from "./utils/interfaces/create-building-dto";
import {UserEntity} from "../users/user.entity";
import {VisitEntity} from "../visits/visit.entity";


@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(BuildingEntity) private buildingRepo: Repository<BuildingEntity>,
    ) {
    }

    public async createBuilding(building_body: CreateBuildingDto, user: UserEntity): Promise<BuildingEntity> {

        const building = this.buildingRepo.create({
            ...building_body,
            created_by: user
        })
        const created_building = await this.getBuildingByName(building.name)

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
        const building = this.buildingRepo.findOneBy({
            id: building_id
        })

        if (!building) {
            throw new NotFoundException("Building with such name doesn't exist");
        }

        return building;
    }

    public async getBuildingByName(building_name: string): Promise<BuildingEntity> {
        const building = this.buildingRepo.findOneBy({
            name: building_name
        })

        if (!building) {
            throw new NotFoundException("Building with such name doesn't exist");
        }

        return building;
    }


    public async getBuildings(visits_promise: Promise<VisitEntity[]>): Promise<BuildingEntity[]> {
        const buildings = await this.buildingRepo.find();
        const visits = await visits_promise
        const visitedBuildingIds = visits.map(visit => visit.id)

        return buildings.map(building => ({
            ...building,
            visited: visitedBuildingIds.includes(building.id),
        }));
    }

    public async updateBuilding(buildingId: number, buildingBody: CreateBuildingDto) {
        const building = await this.getBuildingById(buildingId);
        if (!building) {
            throw new NotFoundException('Building with such id is not registered');
        }

        const buildingName = buildingBody.name;
        const buildingDesc = buildingBody.description;

        if (!buildingBody.name) {
            const buildingName = building.name;
        }
        if (!buildingBody.description) {
            const buildingDesc = building.description;
        }

        try {
            if (buildingName) {
                await this.buildingRepo.update({id: buildingId}, {name: buildingName});
                //return await this.buildingRepo.save(building);
            }

            if (buildingDesc) {
                await this.buildingRepo.update({id: buildingId}, {description: buildingDesc});
                //return await this.buildingRepo.save(building);
            }

        } catch (error) {
            throw error;
        }

    }

    public async deleteBuilding(buildingId: number) {
        const building = await this.getBuildingById(buildingId);
        if (!building) {
            throw new NotFoundException('Building with such id is not registered');
        }

        try {
            await this.buildingRepo.delete({id: buildingId});
            return null;
        } catch (error) {
            throw error;
        }
    }
}