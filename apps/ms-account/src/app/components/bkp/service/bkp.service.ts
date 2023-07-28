import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BkpEntity } from '../../../entities/bkp.entity';
import { FolderEntity } from '../../../entities/folder.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateBkpInput } from '../dto/create-bkp.input';
import BkpNotFoundException from '../exceptions/bkpNotFound.exception';

@Injectable()
export class BkpService {
  constructor(
    @InjectRepository(BkpEntity)
    private BkpRepository: Repository<BkpEntity>,
    public referenceService: ReferenceService,
    @InjectRepository(FolderEntity)
    private FolderRepository: Repository<FolderEntity>
  ) {}

  public async createBkp(createBkpInput: CreateBkpInput, referenceFilter: ReferenceFilterParams): Promise<BkpEntity> {
    try {
      console.log('bkpinput value below: ');
      console.info(createBkpInput);
      const taskeDetails = new BkpEntity({ ...createBkpInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.BkpRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id },
      });

      console.log('newPost value below: ');
      console.info(newPost);

      await this.BkpRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateBkp(createBkpInput: CreateBkpInput, referenceFilter: ReferenceFilterParams): Promise<BkpEntity> {
    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
    const bkp = await this.BkpRepository.findOne({
      where: {
        bkpID: createBkpInput.bkpID,
        reference: { id: selectedReference.id },
      },
    });
    if (bkp) {
      await this.BkpRepository.update(bkp.id, { ...createBkpInput });
      const updatedPost = await this.BkpRepository.findOne({
        where: { id: bkp.id },
      });
      return updatedPost;
    }
    throw new BkpNotFoundException(bkp.bkpID);
  }

  public async findAllBkp(refFilter: ReferenceFilterParams): Promise<BkpEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter);
    return await this.BkpRepository.find({
      where: { reference: { id: selectedReference.id } },
    });
  }

  public async findAllFolder(refFilter: ReferenceFilterParams): Promise<FolderEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter);
    return await this.FolderRepository.find({
      where: { reference: { id: selectedReference.id } },
    });
  }
}
