import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileTypeEntity } from '../../../entities/file-type.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateFileTypeInput } from '../dto/create-filetype.input';
import FileTypeNotFoundException from '../exceptions/filetypeNotFound.exception';

@Injectable()
export class FileTypeService {
  constructor(
    @InjectRepository(FileTypeEntity)
    private FileTypeRepository: Repository<FileTypeEntity>,
    private referenceService: ReferenceService
  ) {}

  public async createFileType(
    createfileTypeInput: CreateFileTypeInput,
    referenceFilter: ReferenceFilterParams
  ): Promise<FileTypeEntity> {
    try {
      const taskeDetails = new FileTypeEntity({ ...createfileTypeInput });
      const selectedReference = await this.referenceService.getReferenceById(
        referenceFilter
      );
      const newPost = await this.FileTypeRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id },
      });
      await this.FileTypeRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateFileType(
    createfileTypeInput: CreateFileTypeInput,
    referenceFilter: ReferenceFilterParams
  ): Promise<FileTypeEntity> {
    const selectedReference = await this.referenceService.getReferenceById(
      referenceFilter
    );
    const filetype = await this.FileTypeRepository.findOne({
      where: {
        fileTypeID: createfileTypeInput.fileTypeID,
        reference: { id: selectedReference.id },
      },
    });
    if (filetype) {
      await this.FileTypeRepository.update(filetype.id, {
        ...createfileTypeInput,
      });
      const updatedPost = await this.FileTypeRepository.findOne({
        where: { id: filetype.id },
      });
      return updatedPost;
    }
    throw new FileTypeNotFoundException(filetype.fileTypeID);
  }

  public async findAllFileType(
    refFilter: ReferenceFilterParams
  ): Promise<FileTypeEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(
      refFilter
    );
    return await this.FileTypeRepository.find({
      where: { reference: { id: selectedReference.id } },
    });
  }
}
