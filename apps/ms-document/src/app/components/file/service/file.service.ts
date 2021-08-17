import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository, TreeRepository } from 'typeorm';
import { FileParamEntity } from '../../../entities/file.param.entity';
import FileReferencesEntity from '../../../entities/fileReference.entity';
import { PeopleEntity } from '../../../entities/people.entity';
import { UploadedFilesEntity } from '../../../entities/uploaded-files.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { FileFilterArgs } from '../dto/args/file-filter.args';
import { FileDeleteInput } from '../dto/args/file.delete';
import { FileReferenceParams } from '../dto/args/param/file-reference.param';
import { ParentFileParams } from '../dto/args/param/parent-file.param';
import { UpdateFileInput } from '../dto/update-file.input';
import { UploadFileInfoInput } from '../dto/upload-file-info.input';


@Injectable()
export class FileService {
  constructor(
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

  public async updateUploadedFile(updateFileInput: UpdateFileInput): Promise<UploadedFilesEntity> {
    try {
      const { peoples } = updateFileInput;
      const fileDetail = await this.uploadedFilesRepository.findOne({ where: { uploadedFileID: updateFileInput.uploadedFileID }, relations: ['fileReferences', 'people'] });
      if (!fileDetail) {
        throw new HttpException('Uploaded file ID Not Found', HttpStatus.NOT_FOUND);
      }

      const res = new UploadedFilesEntity(updateFileInput);
      Object.keys(fileDetail)
        .forEach(k => res[k] = (updateFileInput[k] ?? fileDetail[k]));
      if (peoples) {
        for (let index = 0; index < peoples.length; index++) {
          const followersentity = new PeopleEntity(peoples[index])
          const newPeople = await this.peopleRepository.create({ ...followersentity });
          const savedPeople = await this.peopleRepository.save(newPeople);
          res.people.push(savedPeople)
        }
      }
      await this.uploadedFilesRepository.save(res);
      const reference = await this.uploadedFilesRepository.findOne({ where: { uploadedFileID: updateFileInput.uploadedFileID }, relations: ['fileReferences', 'people'] });
      return reference;
    } catch (error) {
      return error;
    }
  }

  public async saveUploadedFile(uploadFileInfoInput: UploadFileInfoInput, referenceFilter: FileReferenceParams): Promise<UploadedFilesEntity> {
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
      const parentFileDetails = await this.uploadedFilesRepository.findOne({ where: { uploadedFileID: fileParams.parentUploadedFileID }, relations: ['fileReferences', 'people'] });
      if (parentFileDetails) {
        const childStructure = new UploadedFilesEntity(fileParams);
        childStructure.parent = parentFileDetails;
        const trees = await manager.getTreeRepository(UploadedFilesEntity).findDescendantsTree(parentFileDetails);
        if (trees.children.length)
          childStructure.fileVersion = trees.children[trees.children.length - 1].fileVersion + 1;
        else
          childStructure.fileVersion = 1;
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
  //     const manager = getManager();
  //     const trees = await manager.getTreeRepository(UploadedFilesEntity).findTrees();
  //     this.uploadedFilesRepository.createQueryBuilder()
  //     const rootFiles = trees.filter(tree => ( tree.isDeleted==false && tree.referenceID == fileReferenceParams.referenceID && tree.referenceType == fileReferenceParams.referenceType));
  //     return rootFiles;
  //   } catch (error) {
  //     return error;
  //   }
  // }


  // public async uploadedFiles(fileReferenceParams: ReferenceFilterParams): Promise<UploadedFilesEntity[]> {
  //   try {
  //     const trees = await this.uploadedFilesRepository.createQueryBuilder('tree')
  //         .where({parentUploadedFileID: IsNull()})
  //         .andWhere("tree.isDeleted = :isDeleted",{ isDeleted: false })
  //         .andWhere('tree.referenceID = :referenceId', { referenceId: fileReferenceParams.referenceID })
  //         .andWhere('tree.referenceType = :referenceType', { referenceType: fileReferenceParams.referenceType })
  //         .getMany();
  //       return trees

  //       } catch (error){
  //     return error}

  //       }


  public async uploadedFiles(fileReferenceParams: ReferenceFilterParams): Promise<UploadedFilesEntity[]> {
    try {
      const parent = await this.uploadedFilesRepository.find({
        where: {
          parentUploadedFileID: null,
          isDeleted: false,
          referenceID: fileReferenceParams.referenceID,
          referenceType: fileReferenceParams.referenceType,
        }, relations: ['fileReferences', 'people', 'children']
      })

      // #region Retrieve children wise version count - Need improvement 
      let result = []
      if (parent.length > 0) {
        for (let i = 0; i < parent.length; i++) {

          let modifiedFiles = []
          if (parent[i]?.children?.length > 0) {
            for (let j = 0; j < parent[i].children.length; j++) {
              const childUploadedFileId = parent[i].children[j].uploadedFileID
              let versionCount = 0
              versionCount = await this.uploadedFilesRepository.count({
                where: {
                  parentUploadedFileID: childUploadedFileId,
                  isDeleted: false
                }
              });
              modifiedFiles.push({ ...parent[i].children[j], versionCount })
            }
          }
          result.push({...parent[i], children: modifiedFiles})
        }
      }
      // #endregion


      return result
      // return parent
    } catch (error) {
      return error;
    }
  }

  //   public async uploadedFiles(fileReferenceParams: ReferenceFilterParams): Promise<UploadedFilesEntity[]> {
  //   try {
  //     const parent = await this.uploadedFilesRepository.findOne({
  //       where: {
  //         parentUploadedFileID: null,
  //         isDeleted: false,
  //         referenceID: fileReferenceParams.referenceID,
  //         referenceType: fileReferenceParams.referenceType,
  //       }
  //     })

  //     const children = await this.uploadedFilesRepository.findDescendants(parent)
  //     const ids = children.map(child => child.uploadedFileID)

  //     return UploadedFilesEntity
  //       .createQueryBuilder("upload")
  //       .distinct(true)
  //       .innerJoin("upload.children", "child", "child.uploadedFileID IN (:...ids)", { ids })
  //       .innerJoinAndSelect("upload.children", "children")
  //       .orderBy("upload.uploadedFileID")
  //       .getMany()         
  //  } catch (error) {
  //     return error;
  //   }
  // }


  public async deleteFile(fileDeleteInput: FileDeleteInput): Promise<UploadedFilesEntity> {
    const file = await this.uploadedFilesRepository.findOne({ where: { uploadedFileID: fileDeleteInput.uploadedFileID } });
    if (file) {
      file.isDeleted = !(file.isDeleted)
      const updatedPost = await file.save()
      return updatedPost
    }
    throw new HttpException('File Not Found', HttpStatus.NOT_FOUND);
  }


  public async getuploadedFileByID(fileFilter: FileDeleteInput) {
    const parent = await this.uploadedFilesRepository.findOne({
      where: {
        parentUploadedFileID: null,
        isDeleted: false,
        uploadedFileID: fileFilter.uploadedFileID
      }, relations: ['fileReferences', 'people', 'children']
    })
    if (parent) {
      return parent
    }
    throw new HttpException('File Not Found', HttpStatus.NOT_FOUND);

  }

  public async deleteFileVersion(fileDeleteInput: FileDeleteInput): Promise<UploadedFilesEntity> {
    const file = await this.uploadedFilesRepository.findOne({ where: { uploadedFileID: fileDeleteInput.uploadedFileID } });
    if (file) {
      file.isDeleted = !(file.isDeleted)
      const updatedPost = await file.save()
      return updatedPost
    }
    throw new HttpException('File Version with uploadedFileId Not Found', HttpStatus.NOT_FOUND);
  }


}