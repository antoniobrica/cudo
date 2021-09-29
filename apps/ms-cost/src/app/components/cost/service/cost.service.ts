import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BKPCostFilesEntity from '../../../entities/bkp-cost-files.entity';
import BKPCostEntity from '../../../entities/bkp-costs.entity';
import { BkpHierarchyEntity } from '../../../entities/bkphierarchy.entity';
import { BkpLayerOneEntity } from '../../../entities/bkpLayerOne.entity';
import { BkpLayerTwoEntity } from '../../../entities/bkpLayerTwo.entity';
import { CostEntity } from '../../../entities/cost.entity';
import { CostErrorTypeEnum } from '../../../enums/cost-error-type.enum';
import CostCustomError from '../../../exceptions/costCustomError.exception';
import CostFilterParams from '../../../utils/types/costFilterParams';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { BkpDeleteInput } from '../dto/args/delete.bkp';
import { CreateBkpHierarchyInput } from '../dto/create-bkphierarchy.input';
import { CreateCostInput } from '../dto/create-cost.input';
import { BKPcostDeleteInput } from '../dto/delete-BKPCost.input';
import { CostDeleteInput } from '../dto/delete-cost.input';
import { UpdateBkpCostBasicInput } from '../dto/update-bkp-cost.input';
import { UpdateBKPLayerTwo } from '../dto/update-bkp-layer-two.input';
import { AddLayerTwoBkpHierarchyInput } from '../dto/update-bkphierarchy.input';


@Injectable()
export class CostService {
  constructor(
    @InjectRepository(CostEntity)
    private costRepository: Repository<CostEntity>,
    @InjectRepository(BKPCostEntity)
    private BKPCostRepository: Repository<BKPCostEntity>,
    @InjectRepository(BKPCostFilesEntity)
    private BKPCostFilesRepository: Repository<BKPCostFilesEntity>,
    @InjectRepository(BkpHierarchyEntity)
    private bkpHierarchyRepository: Repository<BkpHierarchyEntity>,
    @InjectRepository(BkpLayerOneEntity)
    private BkpLayerOneRepository: Repository<BkpLayerOneEntity>,
    @InjectRepository(BkpLayerTwoEntity)
    private BkpLayerTwoRepository: Repository<BkpLayerTwoEntity>,
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
        }, 'isDeleted': false,
      }, relations: ['BKPCosts', 'BKPCosts.bkpCostFiles']

    });

  }

  public async findCostByID(refFilter: ReferenceFilterParams, costFilterParams: CostFilterParams): Promise<CostEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter);
    const foundCost = await this.costRepository.find({
      where: {
        "references": {
          id: selectedReference.id
        },
        "costID": costFilterParams.costID
      }, relations: ['BKPCosts', 'BKPCosts.bkpCostFiles']

    });
    if (!foundCost.length) {
      throw new CostCustomError(CostErrorTypeEnum.RECORD_NOT_EXIST)
    }
    return foundCost
  }

  public async deleteCost(costDeleteInput: CostDeleteInput): Promise<CostEntity> {
    const cost = await this.costRepository.findOne({ where: { costID: costDeleteInput.costID } });
    if (cost) {
      cost.isDeleted = !(cost.isDeleted)
      const updatedPost = await cost.save()
      return updatedPost
    }
    throw new CostCustomError(CostErrorTypeEnum.RECORD_NOT_EXIST)
  }

  public async deleteBKPCost(bkpCostDeleteInput: BKPcostDeleteInput): Promise<BKPCostEntity> {
    const bkpCost = await this.BKPCostRepository.findOne({ where: { bkpCostID: bkpCostDeleteInput.bkpCostID } });
    if (bkpCost) {
      bkpCost.isDeleted = !(bkpCost.isDeleted)
      const updatedPost = await bkpCost.save()
      return updatedPost
    }
    throw new CostCustomError(CostErrorTypeEnum.RECORD_NOT_EXIST)
  }


  public async updateBKPCostID(updateBkpCostBasicInput: UpdateBkpCostBasicInput): Promise<BKPCostEntity[]> {
    const bkpCostDetails = await this.BKPCostRepository.find({
      where: { bkpCostID: updateBkpCostBasicInput.bkpCostID }
      // relations: ['reference', 'files']
    });
    if (bkpCostDetails.length <= 0) {
      throw new CostCustomError(CostErrorTypeEnum.RECORD_NOT_EXIST);
    }
    const bkpCostDetail = bkpCostDetails[0];
    updateBkpCostBasicInput.BKPTitle ? bkpCostDetail.BKPTitle = updateBkpCostBasicInput.BKPTitle : null;
    updateBkpCostBasicInput.description ? bkpCostDetail.description = updateBkpCostBasicInput.description : null;
    updateBkpCostBasicInput.itemPrice ? bkpCostDetail.itemPrice = updateBkpCostBasicInput.itemPrice : null;
    updateBkpCostBasicInput.itemQuantity ? bkpCostDetail.itemQuantity = updateBkpCostBasicInput.itemQuantity : null;

    await this.BKPCostRepository.save(bkpCostDetail);
    const bkpCostUpdated = await this.BKPCostRepository.find({
      where: { bkpCostID: updateBkpCostBasicInput.bkpCostID }
      // relations: ['reference', 'files']
    });
    return bkpCostUpdated;
  }






  // code by ajay

  public async createBkpHierarchy(createBkpHierarchyInput: CreateBkpHierarchyInput, referenceFilter: ReferenceFilterParams): Promise<BkpHierarchyEntity> {
    try {
      const { BKPID, BKPTitle, structureID, structureName, children } = createBkpHierarchyInput;
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const BkpHierarchyDetail = new BkpHierarchyEntity({ BKPID, BKPTitle, structureID, structureName });
      BkpHierarchyDetail.children = [];
      for (let index = 0; index < children.length; index++) {
        const { BKPID, BKPTitle, childrenLayerTwo } = children[index];
        const childrenLayerOne = new BkpLayerOneEntity({ BKPID, BKPTitle })
        childrenLayerOne.bkpChildrenLayerTwo = [];
        for (let index = 0; index < childrenLayerTwo.length; index++) {
          const { BKPID, BKPTitle, itemPrice, itemTotalPrice, itemQuantity, files, description } = childrenLayerTwo[index]
          const LayerTwo = new BkpLayerTwoEntity({ BKPID, BKPTitle, itemTotalPrice, itemPrice, description, itemQuantity })
          LayerTwo.files = []
          if (files && files.length > 0) {
            for (let index = 0; index < files.length; index++) {
              const fileEntity = new BKPCostFilesEntity(files[index])
              const newFile = await this.BKPCostFilesRepository.create(fileEntity)
              const savedFile = await this.BKPCostFilesRepository.save(newFile)
              LayerTwo.files.push(savedFile)
            }
          }
          const newChildren = await this.BkpLayerTwoRepository.create({ ...LayerTwo, references: { id: selectedReference.id } });
          const savedPeople = await this.BkpLayerTwoRepository.save(newChildren);
          childrenLayerOne.bkpChildrenLayerTwo.push(savedPeople)
        }
        const newBkpHierarchy = await this.BkpLayerOneRepository.create({ ...childrenLayerOne, references: { id: selectedReference.id } });
        const savedCost = await this.BkpLayerOneRepository.save(newBkpHierarchy);
        BkpHierarchyDetail.children.push(savedCost)
      }
      const newPost = await this.bkpHierarchyRepository.create({
        ...BkpHierarchyDetail,
        references: { id: selectedReference.id }
      });
      await this.bkpHierarchyRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  // add bkpCosts based on layer two bkpCostId
  public async createBkpCost(addLayerTwoBkpHierarchy: AddLayerTwoBkpHierarchyInput, referenceFilter: ReferenceFilterParams) {
    const { childrenLayerTwo, structureID } = addLayerTwoBkpHierarchy
    const selectedReference = await this.referenceService.getReferenceById(referenceFilter)

    const savedBkpcosts: BkpLayerTwoEntity[] = []
    for (let index = 0; index < childrenLayerTwo.length; index++) { // loop for added bkp costs
      const { BKPID, BKPTitle, itemPrice, itemTotalPrice, itemQuantity, files, description } = childrenLayerTwo[index]
      const parantBkpId = BKPID[0]
      const bkp = await this.bkpHierarchyRepository.findOne({
        where: {
          "isDeleted": false,
          structureID,
          BKPID: parantBkpId,
          "references": {
            id: selectedReference.id
          }
        }, relations: ['children', 'children.bkpChildrenLayerTwo', 'children.bkpChildrenLayerTwo.files']
      });

      const foundChild = bkp.children.find(item => item.BKPID === BKPID[0] + BKPID[1])
      const child = await this.BkpLayerOneRepository.findOne({
        where: { bkpCostID: foundChild.bkpCostID },
        relations: ['bkpChildrenLayerTwo']
      });
      const layerTwo = new BkpLayerTwoEntity({ BKPID, BKPTitle, itemTotalPrice, itemPrice, description, itemQuantity })
      layerTwo.files = []
      if (files && files.length > 0) {
        for (let index = 0; index < files.length; index++) {
          const fileEntity = new BKPCostFilesEntity(files[index])
          const newFile = await this.BKPCostFilesRepository.create(fileEntity)
          const savedFile = await this.BKPCostFilesRepository.save(newFile)
          layerTwo.files.push(savedFile)
        }
      }
      const newLayerTwo = await this.BkpLayerTwoRepository.create({ ...layerTwo, references: { id: selectedReference.id } })
      const savedLayerTwo = await this.BkpLayerTwoRepository.save({ ...newLayerTwo })
      child.bkpChildrenLayerTwo.push(savedLayerTwo)
      savedBkpcosts.push(savedLayerTwo)
      await this.BkpLayerOneRepository.save({ ...child })
    }
    return await this.getBkps(referenceFilter)
  }

  // find all top level bkps
  public async getBkps(refFilter: ReferenceFilterParams) {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    const bkps = await this.bkpHierarchyRepository.createQueryBuilder('bkphierarchy')
      .leftJoinAndSelect('bkphierarchy.references', 'references')
      .where('references.id = :id', { id: selectedReference.id })
      .andWhere('bkphierarchy.isDeleted = :deletedHierachy', { deletedHierachy: false })
      .leftJoinAndSelect('bkphierarchy.children', 'children')
      .andWhere('children.isDeleted = :deltedLayerOne', { deltedLayerOne: false })
      .leftJoinAndSelect('children.bkpChildrenLayerTwo', 'bkpChildrenLayerTwo')
      .andWhere('bkpChildrenLayerTwo.isDeleted = :deletedLayerTwo', { deletedLayerTwo: false })
      .leftJoinAndSelect('bkpChildrenLayerTwo.files', 'files')
      .getMany()
    if (bkps) {
      return bkps;
    }
    throw new HttpException('BKPUID Does Not Exists', HttpStatus.NOT_FOUND);
  }

  // update bkp cost
  public async updateBkpCost(updateBKPLayerTwo: UpdateBKPLayerTwo): Promise<BkpLayerTwoEntity> {
    const { bkpCostID, files } = updateBKPLayerTwo;
    const foundBkpCost = await this.BkpLayerTwoRepository.findOne({ where: { bkpCostID: bkpCostID } })

    if (!foundBkpCost) {
      throw new NotFoundException('Bkp cost not found')
    }
    console.log('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',files)
    if (files) {
      if (foundBkpCost.files?.length > 0) {
        const previousFilesIDs = foundBkpCost.files.map(file => file.id)
        await this.BKPCostFilesRepository.delete(previousFilesIDs)
      }
      foundBkpCost.files = []
      for (let index = 0; index < files.length; index++) {
        const fileEntity = new BKPCostFilesEntity(files[index])
        const newFile = await this.BKPCostFilesRepository.create(fileEntity)
        const savedFile = await this.BKPCostFilesRepository.save(newFile)
        foundBkpCost.files.push(savedFile)
      }

    }
    updateBKPLayerTwo.BKPTitle ? foundBkpCost.BKPTitle = updateBKPLayerTwo.BKPTitle : null
    updateBKPLayerTwo.description ? foundBkpCost.description = updateBKPLayerTwo.description : null
    updateBKPLayerTwo.itemPrice ? foundBkpCost.itemPrice = updateBKPLayerTwo.itemPrice : null
    updateBKPLayerTwo.itemQuantity ? foundBkpCost.itemQuantity = updateBKPLayerTwo.itemQuantity : null
    updateBKPLayerTwo.itemPrice && updateBKPLayerTwo.itemQuantity ? foundBkpCost.itemTotalPrice = updateBKPLayerTwo.itemPrice * updateBKPLayerTwo.itemQuantity : null

    return await this.BkpLayerTwoRepository.save(foundBkpCost)
  }

  // delete bkp with bkpcostID
  public async deleteBkp(bkpDeleteInput: BkpDeleteInput) {
    const mainBkp = await this.bkpHierarchyRepository.findOne(
      { where: { bkpCostID: bkpDeleteInput.bkpCostID } });
    if (mainBkp) {
      mainBkp.isDeleted = !(mainBkp.isDeleted)
      const updatedPost = await mainBkp.save()
      return updatedPost

    }

    const BkpLayerOne = await this.BkpLayerOneRepository.findOne(
      { where: { bkpCostID: bkpDeleteInput.bkpCostID } });
    if (BkpLayerOne) {
      BkpLayerOne.isDeleted = !(BkpLayerOne.isDeleted)
      const updatedPost = await BkpLayerOne.save()
      return updatedPost
    }

    const BkpLayerTwo = await this.BkpLayerTwoRepository.findOne(
      { where: { bkpCostID: bkpDeleteInput.bkpCostID } });
    if (BkpLayerTwo) {
      BkpLayerTwo.isDeleted = !(BkpLayerTwo.isDeleted)
      const updatedPost = await BkpLayerTwo.save()
      return updatedPost
    }
  }

}