import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {VisitEntity} from "./visit.entity";
import {Repository} from "typeorm";
import {ICreateVisitBody} from "./utils/interfaces/i-create-visit-body";

@Injectable()
export class VisitsService {
    constructor(
        @InjectRepository(VisitEntity) private readonly visitRepo: Repository<VisitEntity>
    ) {
    }

    public async createUser(visit_body: ICreateVisitBody, userId: number): Promise<VisitEntity> {
        const visit = this.visitRepo.create({
            building: {id: visit_body.building_id}, // Assuming you are only passing ID and not full building entity
            user: {id: userId} // Assuming user ID is passed separately or extracted from token
        })

        try {
            return await this.visitRepo.save(visit);
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

    public async getVisits(): Promise<VisitEntity[]> {
        return await this.visitRepo.find()
    }
}