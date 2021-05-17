import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../../../entities/file.entity';
import { FileParamEntity } from '../../../entities/file.param.entity';
import { PeopleEntity } from '../../../entities/people.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateFileInput } from '../dto/create-file.input';
import { UpdateFileInput } from '../dto/update-file.input';


@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private FileRepository: Repository<FileEntity>,
    private referenceService: ReferenceService,
    @InjectRepository(FileParamEntity)
    private fileParamRepository: Repository<FileParamEntity>,
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,

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
        const folder = await this.FileRepository.findOne({ where: { folderName: fileDetail.folderName } });
        if(!folder){
            fileDetail.folderName = fileBasics.folderName
            fileDetail.BKPID = ''
            fileDetail.BKPIDTitle = ''
      } else throw new HttpException('folderName already exists', HttpStatus.NOT_FOUND);
    }
      else {
        const bkpTitle = await this.FileRepository.findOne({ where: { BKPIDTitle: fileDetail.BKPIDTitle } });
        const bkpId = await this.FileRepository.findOne({ where: { BKPID: fileDetail.BKPID } });

        if(!bkpTitle){
        fileDetail.BKPID = fileBasics.BKPID
        fileDetail.BKPIDTitle = fileBasics.BKPIDTitle
        fileDetail.folderName = ''
      } else throw new HttpException('BKPIDTitle already exists', HttpStatus.NOT_FOUND);
      if(!bkpId){
        fileDetail.BKPID = fileBasics.BKPID
      }  else throw new HttpException('BKPID already exists', HttpStatus.NOT_FOUND);

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
}