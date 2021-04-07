import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { ProjectFileEntity } from '../../../entities/projectfile.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateProjectfileInput } from '../dto/create-proejctfile.input';
import ProjectFileNotFoundException from '../exceptions/ProjectFileNotFound.exception';




@Injectable()
export class ProjectFileService {
  constructor(
    @InjectRepository(ProjectFileEntity)
    private ProejctFileRepository: Repository<ProjectFileEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createProjectFile(createprojectfileInput: CreateProjectfileInput, referenceFilter: ReferenceFilterParams): Promise<ProjectFileEntity> {
    try {
      const proejctfileDetails = new ProjectFileEntity({ ...createprojectfileInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.ProejctFileRepository.create({
        ...proejctfileDetails,
        reference: { id: selectedReference.id }
      });
      await this.ProejctFileRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateProjectFile(createprojectfileInput: CreateProjectfileInput, referenceFilter: ReferenceFilterParams): Promise<ProjectFileEntity> {

    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
    const projectfile = await this.ProejctFileRepository.findOne({ where: { projectId: createprojectfileInput.projectId, reference: { id: selectedReference.id } } });
    if (projectfile) {
      await this.ProejctFileRepository.update(projectfile.Id, { ...createprojectfileInput });
      const updatedPost = await this.ProejctFileRepository.findOne(projectfile.Id);
      return updatedPost;
    }
    throw new ProjectFileNotFoundException(projectfile.projectFileId);
  }

  public async findAllProjectFile(refFilter: ReferenceFilterParams): Promise<ProjectFileEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.ProejctFileRepository.find({where: {"reference": {
      id: selectedReference.id
    }}, relations: [ 'filestructure', 'fileuser']
      
    });

  }

}