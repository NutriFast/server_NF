import { Injectable } from "@nestjs/common";

@Injectable()
export class ActivitiesService {
    constructor(){}
    public async create() {
        return 'create'
    }
    public async list() {
        return 'list'
    }
    public async update() {
        return 'update'
    }
    public async delete() {
        return 'delete'
    }
}