import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { FileEntity } from "../../../entities/file.entity";
import { CreatefileInput } from "../dto/createfile.input";


@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private fileRepository: Repository< FileEntity >
        ) {}
      

   public async createfile(createfileinput: CreatefileInput ): Promise< FileEntity >{
        try{
            const fileDetail = new FileEntity({...createfileinput})
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