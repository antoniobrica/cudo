import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { FolderEntity } from '../../../entities/folder.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateFolderInput } from '../dto/create-folder.input';
import { UpdateFolder } from '../dto/update-folder.input';
import FolderNotFoundException from '../exceptions/folderNotFound.exception';




@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(FolderEntity)
    private FolderRepository: Repository<FolderEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createFolder(createfolderInput: CreateFolderInput, referenceFilter: ReferenceFilterParams): Promise<FolderEntity> {
    try {
      const taskeDetails = new FolderEntity({ ...createfolderInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.FolderRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id }
      });
      await this.FolderRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateFolder(updatefolder: UpdateFolder, referenceFilter: ReferenceFilterParams): Promise<FolderEntity> {

    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
    const folder = await this.FolderRepository.findOne({ where: { folderID: updatefolder.folderID, reference: { id: selectedReference.id } } });
    if (folder) {
      await this.FolderRepository.update(folder.id, { ...updatefolder });
      const updatedPost = await this.FolderRepository.findOne(folder.id);
      return updatedPost;
    }
    throw new FolderNotFoundException(folder.folderID);
  }

  public async findAllFolder(refFilter: ReferenceFilterParams): Promise<FolderEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.FolderRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

  }

}