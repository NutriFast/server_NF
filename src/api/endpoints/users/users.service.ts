import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDocument } from "src/api/infrastructure/providers/dynamoDB/documents/userDocument";
import { UserRepository } from "src/api/infrastructure/repositories/userRepository";
import { CreateUserDTO } from "./dtos/createUserDTO";
import { UpdateUserDTO } from "./dtos/updateUserDTO";

@Injectable()
export class UsersService {
    constructor(private repository: UserRepository){}
    public async create(dto: CreateUserDTO) {
        const document = new UserDocument();
        
        document.build(
            null,
            dto.name
        )
        return this.repository.create(document)
    }
    public async list() {
        return this.repository.findAll()
    }
    public async get(id: string) {
        let result;
        try{
            result = await this.repository.getById(id)
        }
        catch(err) {
            throw new NotFoundException(err)
        }
        return result
    }
    public async update(dto: UpdateUserDTO) {
        const document = new UserDocument();
        document.build(
            dto.id,
            dto.name
        )
        let result;
        try{
            result = await this.repository.update(document)
        }
        catch(err) {
            throw new NotFoundException(err)
        }
        return result
    }
    public async delete(id:string) {
        return this.repository.deleteById(id)
    }
}