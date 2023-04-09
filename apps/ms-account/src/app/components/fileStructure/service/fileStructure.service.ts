import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileStructureEntity } from '../../../entities/filestructure.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateFileStructureInput } from '../dto/create-fileStructure.input';
import FileStructureNotFoundException from '../exceptions/fileStructureNotFound.exception';

@Injectable()
export class FileStructureService {
  constructor(
    @InjectRepository(FileStructureEntity)
    private fileStructureRepository: Repository<FileStructureEntity>,
    private referenceService: ReferenceService
  ) {}

  public async createFileStructure(
    createFileStructureInput: CreateFileStructureInput,
    referenceFilter: ReferenceFilterParams
  ): Promise<FileStructureEntity> {
    try {
      const taskeDetails = new FileStructureEntity({
        ...createFileStructureInput,
      });
      const selectedReference = await this.referenceService.getReferenceById(
        referenceFilter
      );
      const newPost = await this.fileStructureRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id },
      });
      await this.fileStructureRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateFileStructure(
    createFileStructureInput: CreateFileStructureInput,
    referenceFilter: ReferenceFilterParams
  ): Promise<FileStructureEntity> {
    const selectedReference = await this.referenceService.getReferenceById(
      referenceFilter
    );
    const filestructure = await this.fileStructureRepository.findOne({
      where: {
        fileStructureID: createFileStructureInput.fileStructureID,
        reference: { id: selectedReference.id },
      },
    });
    if (filestructure) {
      await this.fileStructureRepository.update(filestructure.id, {
        ...createFileStructureInput,
      });
      const updatedPost = await this.fileStructureRepository.findOne({
        where: { id: filestructure.id },
      });
      return updatedPost;
    }
    throw new FileStructureNotFoundException(filestructure.fileStructureID);
  }

  public async findAllFileStructure(
    refFilter: ReferenceFilterParams
  ): Promise<FileStructureEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(
      refFilter
    );
    return await this.fileStructureRepository.find({
      where: { reference: { id: selectedReference.id } },
    });
  }
}
