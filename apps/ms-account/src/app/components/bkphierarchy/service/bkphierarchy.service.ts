import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BkpHierarchyEntity } from '../../../entities/bkphierarchy.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateBkpHierarchyInput } from '../dto/create-bkphierarchy.input';


@Injectable()
export class BkpHierarchyService {
  constructor(
    @InjectRepository(BkpHierarchyEntity)
    private bkpHierarchyRepository: Repository<BkpHierarchyEntity>,
    private referenceService: ReferenceService,

  ) { }

  public async createBkpHierarchy(createBkpHierarchyInput: CreateBkpHierarchyInput, referenceFilter: ReferenceFilterParams): Promise<BkpHierarchyEntity> {
    try {
      const { bkpID,bkpTitle,children } = createBkpHierarchyInput;
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const BkpHierarchyDetail = new BkpHierarchyEntity({bkpID,bkpTitle});
      BkpHierarchyDetail.children = [];
      for (let index = 0; index < children.length; index++) {
        const { bkpID, bkpTitle, BKPChildren } = children[index];
        const childrenLayerOne = new BkpHierarchyEntity({ bkpID,bkpTitle })
        childrenLayerOne.children = [];
        for (let index = 0; index < children.length; index++) {
          const childrenLayerTwo = new BkpHierarchyEntity({ ...BKPChildren[index] })
          const newChildren = await this.bkpHierarchyRepository.create({ ...childrenLayerTwo });
          const savedPeople = await this.bkpHierarchyRepository.save(newChildren);
          childrenLayerOne.children.push(savedPeople)
        }
        const newBkpHierarchy = await this.bkpHierarchyRepository.create({ ...childrenLayerOne });
        const savedCost = await this.bkpHierarchyRepository.save(newBkpHierarchy);
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
//   console.log(">>>>>>>>>>>", listingQB.getMany())
//  return listingQB.getMany()
//   }


// public async searchBkp(bkp: BkpHierarchyFilterParam){
// return await getRepository(BkpHierarchyEntity)
//     .createQueryBuilder("l")
//     .where("l.bkpMain Like :bkp.bkpMain", { bkp:`%${bkp.bkpMain}%` })
//     .getMany();
// }

public async searchBkp(bkp: BkpHierarchyFilterParam){
  const myBkp = await this.bkpHierarchyRepository.find({where:{bkpMain:Like(`%${bkp.bkpMain}%`)}, relations: ['BKPCosts' ]})
  return myBkp
} 


}

