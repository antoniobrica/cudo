import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BkpHierarchyEntity } from '../../../entities/bkphierarchy.entity';
import { BkpLayerOneEntity } from '../../../entities/bkpLayerOne.entity';
import { BkpLayerTwoEntity } from '../../../entities/bkpLayerTwo.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { BkpHierarchyFilterTitle } from '../dto/args/bkpHierarchy.param';
import { BkpHierarchyFilterID } from '../dto/args/bkpId.fiolter';
import { BKPFilterParam } from '../dto/bkp.filter';
import { CreateBkpHierarchyInput } from '../dto/create-bkphierarchy.input';
import { BkpDeleteInput } from '../dto/delete.bkp';
import { AddLayerTwoBkpHierarchyInput } from '../dto/update-bkphierarchy.input';


@Injectable()
export class BkpHierarchyService {
  constructor(
    @InjectRepository(BkpHierarchyEntity)
    private bkpHierarchyRepository: Repository<BkpHierarchyEntity>,
    @InjectRepository(BkpLayerOneEntity)
    private BkpLayerOneRepository: Repository<BkpLayerOneEntity>,
    @InjectRepository(BkpLayerTwoEntity)
    private BkpLayerTwoRepository: Repository<BkpLayerTwoEntity>,
    private referenceService: ReferenceService,

  ) { }

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
          const LayerTwo = new BkpLayerTwoEntity({ ...childrenLayerTwo[index] })
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

  //   public async searchBkp(bkp: BkpHierarchyFilterParam){
  //     let listingQB = getConnection()
  //     .getRepository(BkpHierarchyEntity)
  //     .createQueryBuilder("l");

  //   if (bkp.bkpMain) {
  //     listingQB = listingQB.andWhere("l.bkpMain ilike :bkp.bkpMain", {bkpMain: `%${bkp.bkpMain}%`});
  //   }
  //  return listingQB.getMany()
  //   }


  // public async searchBkp(bkp: BkpHierarchyFilterParam){
  // return await getRepository(BkpHierarchyEntity)
  //     .createQueryBuilder("l")
  //     .where("l.bkpMain Like :bkp.bkpMain", { bkp:`%${bkp.bkpMain}%` })
  //     .getMany();
  // }

  // add bkpCosts based on layer two bkpCostId
  public async addLayerTwoBkpHierarchy(addLayerTwoBkpHierarchy: AddLayerTwoBkpHierarchyInput, referenceFilter: ReferenceFilterParams): Promise<BkpLayerTwoEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
    const children = await this.BkpLayerOneRepository.findOne({
      where: { bkpCostID: addLayerTwoBkpHierarchy.bkpCostID },
      relations: ['bkpChildrenLayerTwo']
    });
    for (let index = 0; index < addLayerTwoBkpHierarchy.childrenLayerTwo.length; index++) {
      const layerTwo = new BkpLayerTwoEntity({ ...addLayerTwoBkpHierarchy.childrenLayerTwo[index] });
      const newLayerTwo = await this.BkpLayerTwoRepository.create({ ...layerTwo, references: { id: selectedReference.id } });
      const savedLayerTwo = await this.BkpLayerTwoRepository.save({ ...newLayerTwo });

      children.bkpChildrenLayerTwo.push(savedLayerTwo)

    }
    const savedLayerOne = await this.BkpLayerOneRepository.save({ ...children })
    return savedLayerOne.bkpChildrenLayerTwo
  }

  public async getBkps(refFilter: ReferenceFilterParams) {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    // const bkps = await this.bkpHierarchyRepository.find({
    //   where: {
    //     "isDeleted": false,
    //     "references": {
    //       id: selectedReference.id
    //     }
    //   }, relations: ['children', 'children.bkpChildrenLayerTwo']
    // });
    const bkps = await this.bkpHierarchyRepository.createQueryBuilder('bkphierarchy')
      .leftJoinAndSelect('bkphierarchy.references', 'references')
      .where('references.id = :id', { id: selectedReference.id })
      .andWhere('bkphierarchy.isDeleted = :deletedHierachy', { deletedHierachy: false })
      .leftJoinAndSelect('bkphierarchy.children', 'children')
      .andWhere('children.isDeleted = :deltedLayerOne', { deltedLayerOne: false })
      .leftJoinAndSelect('children.bkpChildrenLayerTwo', 'bkpChildrenLayerTwo')
      .andWhere('bkpChildrenLayerTwo.isDeleted = :deletedLayerTwo', { deletedLayerTwo: false })
      .getMany()
    if (bkps) {
      return bkps;
    }
    throw new HttpException('BKPUID Does Not Exists', HttpStatus.NOT_FOUND);
  }


  public async searchBkpObjects(bkpTitleFilter?: BkpHierarchyFilterTitle, bkpIdFilter?: BkpHierarchyFilterID) {
    if (bkpTitleFilter) {
      const mainBkp = await this.bkpHierarchyRepository.find(
        { where: { "isDeleted": false, BKPTitle: Like(`%${bkpTitleFilter.BKPTitle}%`) }, relations: ['children', 'children.bkpChildrenLayerTwo'] });

      const BkpLayerOne = await this.BkpLayerOneRepository.find(
        { where: { "isDeleted": false, BKPTitle: Like(`%${bkpTitleFilter.BKPTitle}%`) }, relations: ['bkpChildrenLayerTwo'] });

      const BkpLayerTwo = await this.BkpLayerTwoRepository.find(
        { where: { "isDeleted": false, BKPTitle: Like(`%${bkpTitleFilter.BKPTitle}%`) } });

      return {
        mainBkp,
        BkpLayerOne
        , BkpLayerTwo
      }
    }


    if (bkpIdFilter) {
      const mainBkp = await this.bkpHierarchyRepository.find(
        { where: { "isDeleted": false, BKPID: Like(`%${bkpIdFilter.BKPID}%`) }, relations: ['children'] });

      const BkpLayerOne = await this.BkpLayerOneRepository.find(
        { where: { "isDeleted": false, BKPID: Like(`%${bkpIdFilter.BKPID}%`) }, relations: ['bkpChildrenLayerTwo'] });

      const BkpLayerTwo = await this.BkpLayerTwoRepository.find(
        { where: { "isDeleted": false, BKPID: Like(`%${bkpIdFilter.BKPID}%`) } });

      return {
        mainBkp,
        BkpLayerOne
        , BkpLayerTwo
      }
    }
  }

  async getBKPByID(bkpFilter: BKPFilterParam) {
    const bkp = await this.bkpHierarchyRepository.findOne({ where: { "isDeleted": false, ...bkpFilter }, relations: ['children', 'children.bkpChildrenLayerTwo'] });
    if (bkp) {
      return bkp;
    }
    throw new HttpException('BKPUID Does Not Exists', HttpStatus.NOT_FOUND);
  }


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