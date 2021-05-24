import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository, TreeRepository } from 'typeorm';
import { FileEntity } from '../../../entities/file.entity';
import { FileParamEntity } from '../../../entities/file.param.entity';
import FileReferencesEntity from '../../../entities/fileReference.entity';
import { PeopleEntity } from '../../../entities/people.entity';
import { UploadedFilesEntity } from '../../../entities/uploaded-files.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { FileFilterArgs } from '../dto/args/file-filter.args';
import { FileReferenceParams } from '../dto/args/param/file-reference.param';
import { FileParams } from '../dto/args/param/file.param';
import { ParentFileParams } from '../dto/args/param/parent-file.param';
import { CreateFileInput } from '../dto/create-file.input';
import { UpdateFileInput } from '../dto/update-file.input';
import { UploadFileInfoInput } from '../dto/upload-file-info.input';


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
    private fileReferencesRepository: Repository<FileReferencesEntity>,
    @InjectRepository(UploadedFilesEntity)
    private uploadedFilesRepository: TreeRepository<UploadedFilesEntity>

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

  public async saveUploadedFile(uploadFileInfoInput: UploadFileInfoInput, referenceFilter: ReferenceFilterParams): Promise<UploadedFilesEntity> {
    try {
      const manager = getManager();
      const { peoples } = uploadFileInfoInput;
      let parentfileDetail;
      const fileDetail = new UploadedFilesEntity({ ...uploadFileInfoInput });
      if (uploadFileInfoInput.directory != null && uploadFileInfoInput.directory != '') {
        const trees = await manager.getTreeRepository(UploadedFilesEntity).findRoots();
        parentfileDetail = trees.filter(tree => (tree.referenceID == uploadFileInfoInput.referenceID && tree.referenceType == uploadFileInfoInput.referenceType && tree.directory == uploadFileInfoInput.directory && tree.parentUploadedFileID == uploadFileInfoInput.parentUploadedFileID));
        if (parentfileDetail.length) {
          fileDetail.parentUploadedFileID = parentfileDetail[0].uploadedFileID;
          fileDetail.parent = parentfileDetail[0];
        }
        else {
          const parentfileDetail = new UploadedFilesEntity({ ...uploadFileInfoInput });
          parentfileDetail.fileVersion = 0;
          await manager.save(parentfileDetail);
          fileDetail.parentUploadedFileID = parentfileDetail.uploadedFileID;
          fileDetail.parent = parentfileDetail;
        }
      }
      fileDetail.fileVersion = 0;
      fileDetail.fileReferences = [];
      fileDetail.people = [];
      const fileReference = new FileReferencesEntity({ ...referenceFilter });
      const newFile = await this.fileReferencesRepository.create({ ...fileReference });
      const newFileReference = await this.fileReferencesRepository.save(newFile);
      fileDetail.fileReferences.push(newFileReference);
      for (let index = 0; index < peoples.length; index++) {
        const followersentity = new PeopleEntity(peoples[index])
        const newPeople = await this.peopleRepository.create({ ...followersentity });
        const savedPeople = await this.peopleRepository.save(newPeople);
        fileDetail.people.push(savedPeople)
      }
      const newPost = await this.uploadedFilesRepository.create({
        ...fileDetail
      });
      const savedFile = await this.uploadedFilesRepository.save(newPost);
      return savedFile;
    } catch (error) {
      return error;
    }
  }

  public async uploadNewFileVersion(fileParams: UploadFileInfoInput): Promise<UploadedFilesEntity> {
    try {
      const manager = getManager();
      const parentFileDetails = await this.uploadedFilesRepository.findOne({ where: { uploadedFileID: fileParams.parentUploadedFileID } });
      if (parentFileDetails) {
        const childStructure = new UploadedFilesEntity(fileParams);
        childStructure.parent = parentFileDetails;
        const trees = await manager.getTreeRepository(UploadedFilesEntity).findDescendantsTree(parentFileDetails);
        childStructure.fileVersion = trees.children[trees.children.length - 1].fileVersion + 1;
        await manager.save(childStructure);
      }
      else {
        throw new HttpException('Major file version ID Not found', HttpStatus.NOT_FOUND);
      }
      const trees = await manager.getTreeRepository(UploadedFilesEntity).findDescendantsTree(parentFileDetails);
      return trees;
    } catch (error) {
      return error;
    }
  }

  public async fileVersions(parentFileParams: ParentFileParams): Promise<UploadedFilesEntity> {
    try {
      const manager = getManager();
      const parentFileDetails = await this.uploadedFilesRepository.findOne({ where: { uploadedFileID: parentFileParams.uploadedFileID, referenceID: parentFileParams.referenceID, referenceType: parentFileParams.referenceType }, relations: ['fileReferences', 'people'] });
      if (!parentFileDetails) {
        throw new HttpException('Parent file not found', HttpStatus.NOT_FOUND);
      }
      const trees = await manager.getTreeRepository(UploadedFilesEntity).findDescendantsTree(parentFileDetails);
      return trees;
    } catch (error) {
      return error;
    }
  }

  public async addReferenceToFile(fileParams: FileFilterArgs, fileReferenceParams: FileReferenceParams): Promise<UploadedFilesEntity> {
    try {
      const manager = getManager();
      const parentFileDetails = await this.uploadedFilesRepository.findOne({ where: { uploadedFileID: fileParams.uploadedFileID }, relations: ['fileReferences', 'people'] });
      if (parentFileDetails) {
        const fileReference = new FileReferencesEntity(fileReferenceParams);
        parentFileDetails.fileReferences.push(fileReference);
        await manager.save(parentFileDetails);
      }
      else {
        throw new HttpException('Major file version ID Not found', HttpStatus.NOT_FOUND);
      }
      const trees = await this.uploadedFilesRepository.findOne({ where: { uploadedFileID: fileParams.uploadedFileID }, relations: ['fileReferences', 'people'] });
      return trees;
    } catch (error) {
      return error;
    }
  }

  // public async uploadedFiles(fileReferenceParams: ReferenceFilterParams): Promise<UploadedFilesEntity[]> {
  //   try {
  //     const trees = await this.uploadedFilesRepository.find({ where: { referenceID: fileReferenceParams.referenceID }, relations: ['fileReferences', 'people'] });
  //     return trees;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  public async uploadedFiles(fileReferenceParams: ReferenceFilterParams): Promise<UploadedFilesEntity[]> {
    try {
      const manager = getManager();
      const trees = await manager.getTreeRepository(UploadedFilesEntity).findTrees();
      this.uploadedFilesRepository.createQueryBuilder()
      const rootFiles = trees.filter(tree => (tree.referenceID == fileReferenceParams.referenceID && tree.referenceType == fileReferenceParams.referenceType));
      return rootFiles;
    } catch (error) {
      return error;
    }
  }


}