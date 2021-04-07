import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { BKP } from '../../../entities/bkp.entity';
import { FileEntity } from '../../../entities/file.entity';
import { FileParamEntity } from '../../../entities/file.param.entity';
import { FileStructureEntity } from '../../../entities/filestructure.entity';
import { Phases } from '../../../entities/phases.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateFileInput } from '../dto/create-file.input';


@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private FileRepository: Repository<FileEntity>,
    private referenceService: ReferenceService,
    @InjectRepository(FileParamEntity)
    private fileParamRepository: Repository<FileParamEntity>,
    @InjectRepository(BKP)
    private bkprepo: Repository<BKP>,
    @InjectRepository(FileParamEntity)
    private filestructurerepo: Repository<FileStructureEntity>,
    @InjectRepository(Phases)
    private phaserepo: Repository<Phases>,
    
  ) { }

  public async createFile(createFileInput: CreateFileInput, referenceFilter: ReferenceFilterParams): Promise<FileEntity> {
    try {
      const fileDetail = new FileEntity({});
      fileDetail.fileParam = [];
      const { fileParam, fileBasics, phase,filestructure, folder, bkp } = createFileInput;
      for (let index = 0; index < fileParam.length; index++) {
        const fileParamentity = new FileParamEntity(fileParam[index])
        const newFile = await this.fileParamRepository.create({ ...fileParamentity });
        const savedFile = await this.fileParamRepository.save(newFile);
        fileDetail.fileParam.push(savedFile)
      }
      
      fileDetail.isFolder = fileBasics.isFolder
      if(fileDetail.isFolder == true){
        fileDetail.folderName = folder.folderName}
      else {
        fileDetail.BKPID = bkp.BKPID
      }
      fileDetail.fileTypeID = fileBasics.fileTypeID
      fileDetail.phaseID = phase.phaseID
      fileDetail.structureId = filestructure.structureId
      fileDetail.structureTitle = filestructure.structureTitle
      fileDetail.fileTypeName = fileBasics.fileTypeName
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.FileRepository.create({
        ...fileDetail,
        reference: { id: selectedReference.id }
      });
      await this.FileRepository.save(newPost);
      return newPost;
    }catch (error) {
      return error;
    }
  }


  // public async updateFile(createFileInput: CreateFileInput, referenceFilter: ReferenceFilterParams): Promise<FileEntity> {

  //   const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
  //   const file = await this.fileParamRepository.findOne({ where: { fileTitle: createFileInput.fileBasics, reference: { id: selectedReference.id } } });
  //   if (file) {
  //     await this.FileRepository.update(file.fileTitle, { ...createFileInput });
  //     const updatedPost = await this.FileRepository.findOne(file.fileTitle);
  //     return updatedPost;
  //   }
  //   throw new FileNotFoundException(file.fileTitle);
  // }

  public async findAllFile(refFilter: ReferenceFilterParams): Promise<FileEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.FileRepository.find({where : { "reference": {
      id: selectedReference.id
    }   }, relations: [ 'fileParam', 'projectfile' ]
     
    });

  }

}