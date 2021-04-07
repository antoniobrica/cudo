import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { ProjectFileEntity } from "../../../entities/projectfile.entity";
import { CreateProjectfileInput } from "../dto/createprojectfile.input";


@Injectable()
export class ProjectFileService {
    constructor(
        @InjectRepository(ProjectFileEntity)
        private projectfileRepository: Repository< ProjectFileEntity >
        ) {}
      

   public async createfile(createfileinput: CreateProjectfileInput ): Promise< ProjectFileEntity >{
        try{
            const fileDetail = new ProjectFileEntity({...createfileinput})
            const newfile = await this.projectfileRepository.create({
                ...fileDetail});
            await this.projectfileRepository.save(newfile);
            return newfile;
        }
        catch (error) {
            return error;
          }

    }
    public async findAllProjectFile(): Promise<ProjectFileEntity[]> {
        return await this.projectfileRepository.find({ relations: [ 'filestructure', 'fileuser' ]
         
        });
    
      }

}