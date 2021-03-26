import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileUserEntity } from "../../../entities/fileuser.entity";
import { CreateFileUserInput } from "../dto/create-fileuser.input";

@Injectable()
export class FileUserService {
    constructor(
        @InjectRepository(FileUserEntity)
        private fileUserRepository: Repository< FileUserEntity >,
      ) {}

    create(createFileUserData: CreateFileUserInput): Promise<FileUserEntity>{
        return this.fileUserRepository.save(createFileUserData);
    }

    findAll(): Promise<FileUserEntity[]> {
        return this.fileUserRepository.find();
      }

    findOne(id: number): Promise<FileUserEntity> {
        return this.fileUserRepository.findOne(id);
      }

}