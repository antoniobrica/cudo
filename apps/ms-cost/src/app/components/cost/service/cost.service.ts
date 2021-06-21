import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BKPCostFilesEntity from '../../../entities/bkp-cost-files.entity';
import BKPCostEntity from '../../../entities/bkp-costs.entity';
import { CostEntity } from '../../../entities/cost.entity';
import CostFilterParams from '../../../utils/types/costFilterParams';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateCostInput } from '../dto/create-cost.input';
import { CostDeleteInput } from '../dto/delete-cost.input';


@Injectable()
export class CostService {
  constructor(
    @InjectRepository(CostEntity)
    private costRepository: Repository<CostEntity>,
    @InjectRepository(BKPCostEntity)
    private BKPCostRepository: Repository<BKPCostEntity>,
    @InjectRepository(BKPCostFilesEntity)
    private BKPCostFilesRepository: Repository<BKPCostFilesEntity>,
    private referenceService: ReferenceService,

  ) { }

  public async createCost(createCostInput: CreateCostInput, referenceFilter: ReferenceFilterParams): Promise<CostEntity> {
    try {
      const { BKPCosts, costBasicInfo } = createCostInput;
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const costDetail = new CostEntity({ ...costBasicInfo });
      costDetail.BKPCosts = [];
      for (let index = 0; index < BKPCosts.length; index++) {
        const { bkpCostFiles, bkpCostBasic } = BKPCosts[index];
        const costParamentity = new BKPCostEntity({ ...bkpCostBasic })
        costParamentity.bkpCostFiles = [];
        for (let index = 0; index < bkpCostFiles.length; index++) {
          const followersentity = new BKPCostFilesEntity({ ...bkpCostFiles[index] })
          const newPeople = await this.BKPCostFilesRepository.create({ ...followersentity });
          const savedPeople = await this.BKPCostFilesRepository.save(newPeople);
          costParamentity.bkpCostFiles.push(savedPeople)
        }
        const newCost = await this.BKPCostRepository.create({ ...costParamentity });
        const savedCost = await this.BKPCostRepository.save(newCost);
        costDetail.BKPCosts.push(savedCost)
      }
      const newPost = await this.costRepository.create({
        ...costDetail,
        references: { id: selectedReference.id }
      });
      await this.costRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async findAllCost(refFilter: ReferenceFilterParams): Promise<CostEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter);
    return await this.costRepository.find({
      where: {
        "references": {
          id: selectedReference.id
        },'isDeleted': false,
      }, relations: ['BKPCosts', 'BKPCosts.bkpCostFiles']

    });

  }

  public async findCostByID(refFilter: ReferenceFilterParams, costFilterParams: CostFilterParams): Promise<CostEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter);
    return await this.costRepository.find({
      where: {
        "references": {
          id: selectedReference.id
        },
        "costID": costFilterParams.costID
      }, relations: ['BKPCosts', 'BKPCosts.bkpCostFiles']

    });

  }

  public async deleteCost(costDeleteInput: CostDeleteInput): Promise<CostEntity> {
    const cost = await this.costRepository.findOne({ where:{costID:costDeleteInput.costID} });
    if (cost) {
      cost.isDeleted=!(cost.isDeleted)
      const updatedPost = await cost.save()
      return updatedPost
      }
      throw new HttpException('cost with costId Not Found', HttpStatus.NOT_FOUND);
    }

  
}