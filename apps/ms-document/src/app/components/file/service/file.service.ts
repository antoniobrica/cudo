import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository, TreeRepository } from 'typeorm';
import { FileEntity } from '../../../entities/file.entity';
import { FileParamEntity } from '../../../entities/file.param.entity';
import FileReferencesEntity from '../../../entities/fileReference.entity';
import { PeopleEntity } from '../../../entities/people.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { FileFilterArgs } from '../dto/args/file-filter.args';
import { FileReferenceParams } from '../dto/args/param/file-reference.param';
import { FileParams } from '../dto/args/param/file.param';
import { CreateFileInput } from '../dto/create-file.input';
import { UpdateFileInput } from '../dto/update-file.input';


@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private FileRepository: Repository<FileEntity>,
    private referenceService: ReferenceService,
    @InjectRepository(FileParamEntity)
    private fileParamRepository: TreeRepository<FileParamEntity>,
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
    @InjectRepository(FileReferencesEntity)
    private fileReferencesEntity: Repository<FileReferencesEntity>,

  ) { }

  public async createFile(createFileInput: CreateFileInput, referenceFilter: ReferenceFilterParams): Promise<FileEntity> {
    try {

      const { files, fileBasics, people } = createFileInput;
      const fileDetail = new FileEntity({ ...fileBasics });
      fileDetail.files = [];
      fileDetail.people = [];
      for (let index = 0; index < files.length; index++) {
        const fileParamentity = new FileParamEntity(files[index])
        const newFile = await this.fileParamRepository.create({ ...fileParamentity });
        const savedFile = await this.fileParamRepository.save(newFile);
        fileDetail.files.push(savedFile)
      }
      for (let index = 0; index < people.length; index++) {
        const followersentity = new PeopleEntity(people[index])
        const newPeople = await this.peopleRepository.create({ ...followersentity });
        const savedPeople = await this.peopleRepository.save(newPeople);
        fileDetail.people.push(savedPeople)
      }
      fileDetail.isFolder = fileBasics.isFolder
      if (fileDetail.isFolder == true) {
        fileDetail.folderName = fileBasics.folderName
        fileDetail.BKPID = ''
        fileDetail.BKPIDTitle = ''
      }
      else {
        fileDetail.BKPID = fileBasics.BKPID
        fileDetail.BKPIDTitle = fileBasics.BKPIDTitle
        fileDetail.folderName = ''
      }
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.FileRepository.create({
        ...fileDetail,
        reference: { id: selectedReference.id }
      });
      await this.FileRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async findAllFile(refFilter: ReferenceFilterParams): Promise<FileEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.FileRepository.find({
      where: {
        "reference": {
          id: selectedReference.id
        }
      }, relations: ['files', 'people']

    });

  }

  public async updateFile(updateFileInput: UpdateFileInput): Promise<FileEntity> {
    try {
      const { files, fileBasics, people } = updateFileInput;
      const fileDetail = await this.FileRepository.findOne({ where: { projectFileID: updateFileInput.projectFileID }, relations: ['files', 'people'] });
      if (!fileDetail) {
        throw new HttpException('Project Not Found', HttpStatus.NOT_FOUND);
      }
      if (files) {
        for (let index = 0; index < files.length; index++) {
          const fileParamentity = new FileParamEntity(files[index])
          const newFile = await this.fileParamRepository.create({ ...fileParamentity });
          const savedFile = await this.fileParamRepository.save(newFile);
          fileDetail.files.push(savedFile)
        }
      }
      if (people) {
        for (let index = 0; index < people.length; index++) {
          const followersentity = new PeopleEntity(people[index])
          const newPeople = await this.peopleRepository.create({ ...followersentity });
          const savedPeople = await this.peopleRepository.save(newPeople);
          fileDetail.people.push(savedPeople)
        }
      }
      await this.FileRepository.save(fileDetail);
      const reference = await this.FileRepository.findOne({ where: { projectFileID: updateFileInput.projectFileID }, relations: ['files', 'people'] });
      return reference;
    } catch (error) {
      return error;
    }
  }

  public async uploadNewFileVersion(fileParams: FileParams): Promise<FileParamEntity> {
    try {
      const manager = getManager();
      const parentStructure = await this.fileParamRepository.findOne({ where: { fileID: fileParams.majorFileID } });
      if (parentStructure) {
        const childStructure = new FileParamEntity(fileParams);
        childStructure.parent = parentStructure;
        await manager.save(childStructure);
      }
      else {
        throw new HttpException('Major file version ID Not found', HttpStatus.NOT_FOUND);
      }
      const trees = await manager.getTreeRepository(FileParamEntity).findDescendantsTree(parentStructure);
      return trees;
    } catch (error) {
      return error;
    }
  }

  public async allFileVersion(createStructureInput: FileParams): Promise<FileParamEntity> {
    try {
      const manager = getManager();
      const parentStructure = await this.fileParamRepository.findOne({ where: { fileID: createStructureInput.majorFileID }, relations: ['fileReferences'] });
      console.log(parentStructure, createStructureInput.majorFileID);
      if (!parentStructure) {
        throw new HttpException('Major file version ID Not found', HttpStatus.NOT_FOUND);
      }
      const trees = await manager.getTreeRepository(FileParamEntity).findDescendantsTree(parentStructure);
      return trees;
    } catch (error) {
      return error;
    }
  }

  public async addReferenceToFile(fileParams: FileFilterArgs, fileReferenceParams: FileReferenceParams): Promise<FileParamEntity> {
    try {
      const manager = getManager();
      const parentStructure = await this.fileParamRepository.findOne({ where: { fileID: fileParams.fileId }, relations: ['fileReferences'] });
      if (parentStructure) {
        const fileReference = new FileReferencesEntity(fileReferenceParams);
        parentStructure.fileReferences.push(fileReference);
        await manager.save(parentStructure);
      }
      else {
        throw new HttpException('Major file version ID Not found', HttpStatus.NOT_FOUND);
      }
      const trees = await this.fileParamRepository.findOne({ where: { fileID: fileParams.fileId }, relations: ['fileReferences'] });
      return trees;
    } catch (error) {
      return error;
    }
  }
}