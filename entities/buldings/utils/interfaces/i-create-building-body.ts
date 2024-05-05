export interface ICreateBuildingBody {
    name: string;
    description: string;
    location: {
        latitude: number;
        longitude: number
    }
}

