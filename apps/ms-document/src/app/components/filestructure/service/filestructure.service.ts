import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileStructureEntity } from "../../../entities/filestructure.entity";
import { CreateFileStructureInput } from "../dto/create-filestructure.input";

@Injectable()
export class FileStructureService {
    constructor(
        @InjectRepository(FileStructureEntity)
        private filestructureRepository: Repository< FileStructureEntity >,
      ) {}
      

    create(createFileStructureData: CreateFileStructureInput): Promise<FileStructureEntity>{
        return this.filestructureRepository.save(createFileStructureData);
    }

    findAll(): Promise<FileStructureEntity[]> {
        return this.filestructureRepository.find();
      }

    findOne(id: number): Promise<FileStructureEntity> {
        return this.filestructureRepository.findOne(id);
      }

}