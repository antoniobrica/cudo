import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { ProjectFileEntity } from "../../../entities/projectfile.entity";
import { CreateProjectfileInput } from "../dto/createprojectfile.input";


@Injectable()
export class ProjectFileService {
    constructor(
        @InjectRepository(ProjectFileEntity)
        private fileRepository: Repository< ProjectFileEntity >
        ) {}
      

   public async createfile(createfileinput: CreateProjectfileInput ): Promise< ProjectFileEntity >{
        try{
            const fileDetail = new ProjectFileEntity({...createfileinput})
            const newfile = await this.fileRepository.create({
                ...fileDetail});
            await this.fileRepository.save(newfile);
            return newfile;
        }
        catch (error) {
            return error;
          }

    }
}