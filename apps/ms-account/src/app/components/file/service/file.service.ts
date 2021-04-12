import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { FileEntity } from '../../../entities/file.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateFileInput } from '../dto/create-file.input';
import FileNotFoundException from '../exceptions/fileNotFound.exception';



@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private FileRepository: Repository<FileEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createFile(createFileInput: CreateFileInput, referenceFilter: ReferenceFilterParams): Promise<FileEntity> {
    try {
      const taskeDetails = new FileEntity({ ...createFileInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.FileRepository.create({
        ...taskeDetails,
        // reference: { id: selectedReference.id }
      });
      await this.FileRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateFile(createFileInput: CreateFileInput, referenceFilter: ReferenceFilterParams): Promise<FileEntity> {

    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
    const file = await this.FileRepository.findOne({ where: { fileID: createFileInput.fileID, reference: { id: selectedReference.id } } });
    if (file) {
      await this.FileRepository.update(file.id, { ...createFileInput });
      const updatedPost = await this.FileRepository.findOne(file.id);
      return updatedPost;
    }
    throw new FileNotFoundException(file.fileID);
  }

  public async findAllFile(refFilter: ReferenceFilterParams): Promise<FileEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.FileRepository.find({
      // "reference": {
        // id: selectedReference.id
      }
    
    );

  }

}