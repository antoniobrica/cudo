import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { Folder } from "../../../entities/folder.entity";
import { CreateFolderInput } from "../dto/create-folder.input";



@Injectable()
export class FolderService {
    constructor(
        @InjectRepository(Folder)
        private folderRepository: Repository< Folder >,
      ) {}
      

    // create(createfolderData: CreateFolderInput): Promise<Folder>{
    //     return this.folderRepository.save(createfolderData);
    // }

    findAll(): Promise<Folder[]> {
        return this.folderRepository.find();
      }

    findOne(id: number): Promise<Folder> {
        return this.folderRepository.findOne(id);
      }

}