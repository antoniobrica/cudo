import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { FileVersionEntity } from '../../../entities/fileversion.entity';
import { CreateFileVersionInput } from '../dto/create-fileversion.input';




@Injectable()
export class FileVersionService {
  constructor(
    @InjectRepository(FileVersionEntity)
    private FileVersionRepository: Repository<FileVersionEntity>
  ) { }

  public async createFile(createFileInput: CreateFileVersionInput): Promise<FileVersionEntity> {
    try {
      const taskeDetails = new FileVersionEntity({ ...createFileInput });
      const newPost = await this.FileVersionRepository.create({
        ...taskeDetails,
      });
      await this.FileVersionRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number): Promise<FileVersionEntity> {
    return this.FileVersionRepository.findOne(id);
  }

}