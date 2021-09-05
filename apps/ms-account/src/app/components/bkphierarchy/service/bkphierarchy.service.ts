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
      const { bkpID,bkpTitle,children } = createBkpHierarchyInput;
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const BkpHierarchyDetail = new BkpHierarchyEntity({ bkpID,bkpTitle});
      BkpHierarchyDetail.children = [];
      for (let index = 0; index < children.length; index++) {
        const { bkpID, bkpTitle, childrenLayerTwo } = children[index];
        const childrenLayerOne = new BkpLayerOneEntity({ bkpID, bkpTitle })
        childrenLayerOne.bkpChildrenLayerTwo = [];
        for (let index = 0; index < childrenLayerTwo.length; index++) {
          const LayerTwo = new BkpLayerTwoEntity({ ...childrenLayerTwo[index] })
          const newChildren = await this.BkpLayerTwoRepository.create({ ...LayerTwo });
          const savedPeople = await this.BkpLayerTwoRepository.save(newChildren);
          childrenLayerOne.bkpChildrenLayerTwo.push(savedPeople)
        }
        const newBkpHierarchy = await this.BkpLayerOneRepository.create({ ...childrenLayerOne });
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


public async searchBkpObjects(bkptitle?: BkpHierarchyFilterTitle, bkpid?: BkpHierarchyFilterID){
  if(bkptitle){
  const mainBkp = await this.bkpHierarchyRepository.find(
    {where:{"isDeleted":false, bkpTitle:Like(`%${bkptitle.bkpTitle}%`)}, relations: ['children','children.bkpChildrenLayerTwo']});

  const BkpLayerOne = await this.BkpLayerOneRepository.find(
      {where:{"isDeleted":false, bkpTitle:Like(`%${bkptitle.bkpTitle}%`)}, relations: ['bkpChildrenLayerTwo']});

  const BkpLayerTwo = await this.BkpLayerTwoRepository.find(
        {where:{"isDeleted":false, bkpTitle:Like(`%${bkptitle.bkpTitle}%`)}});

        return{
          mainBkp,
          BkpLayerOne
          ,BkpLayerTwo
        }
  }


  if(bkpid){
    const mainBkp = await this.bkpHierarchyRepository.find(
      {where:{"isDeleted":false, bkpID:Like(`%${bkpid.bkpID}%`)}, relations: ['children']});
  
    const BkpLayerOne = await this.BkpLayerOneRepository.find(
      {where:{"isDeleted":false, bkpID:Like(`%${bkpid.bkpID}%`)}, relations: ['bkpChildrenLayerTwo']});
  
    const BkpLayerTwo = await this.BkpLayerTwoRepository.find(
      {where:{"isDeleted":false,bkpID:Like(`%${bkpid.bkpID}%`)}});
  
          return{
            mainBkp,
            BkpLayerOne
            ,BkpLayerTwo
          }
  }
} 

async getBKPByID(bkpFilter: BKPFilterParam) {
  const bkp = await this.bkpHierarchyRepository.findOne({ where: {"isDeleted":false, ...bkpFilter }, relations: ['children','children.bkpChildrenLayerTwo'] });
  if (bkp) {
      return bkp;
  }
  throw new HttpException('BKPUID Does Not Exists', HttpStatus.NOT_FOUND);
}


public async deleteBkp(bkpDeleteInput: BkpDeleteInput) {
 
    const mainBkp = await this.bkpHierarchyRepository.findOne(
      {where:{bkpUID:bkpDeleteInput.bkpUID}});

      if (mainBkp) {
        mainBkp.isDeleted=!(mainBkp.isDeleted)
        const updatedPost = await mainBkp.save()
        return updatedPost

      }
  
    const BkpLayerOne = await this.BkpLayerOneRepository.findOne(
      {where:{bkpUID:bkpDeleteInput.bkpUID}});
      if (BkpLayerOne) {
        BkpLayerOne.isDeleted=!(BkpLayerOne.isDeleted)
        const updatedPost = await BkpLayerOne.save()
        return updatedPost
      }

      
  
    const BkpLayerTwo = await this.BkpLayerTwoRepository.findOne(
      {where:{bkpUID:bkpDeleteInput.bkpUID}});

      if (BkpLayerTwo) {
        BkpLayerTwo.isDeleted=!(BkpLayerTwo.isDeleted)
        const updatedPost = await BkpLayerTwo.save()
        return updatedPost
      }
   


  }

}