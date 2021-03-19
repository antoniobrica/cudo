import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { CreatefileInput } from "../file/dto/create-file.input";
import { fileEntity } from "./file.entity";




@Injectable()
export class FileUploadService {
    constructor(@InjectRepository(fileEntity)private fileRepository: Repository< fileEntity >,
    private readonly _envConfig: ConfigService) {}

    // public async uploadFile(id, fileId) {

    //     try {
    //         const fileInfo = {
    //             file: fileId
    //         }
    //         const updated = await this.fileRepository.findOneAndUpdate({ _id: id }, fileInfo, { new: true })
    //         return updated;
    //     } catch (error) {

    //         return error
    //     }
    // }

      
    create(createfileData: CreatefileInput): Promise<fileEntity>{
        return this.fileRepository.save(createfileData);
    }

}