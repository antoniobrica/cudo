import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import BKPCostFilesEntity from '../../../entities/bkp-cost-files.entity';
import BKPCostEntity from '../../../entities/bkp-costs.entity';
import { BkpHierarchyEntity } from '../../../entities/bkphierarchy.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import BkpHierarchyFilterParam from '../dto/args/bkp.filter';
import { CreateBkpHierarchyInput } from '../dto/create-bkphierarchy.input';


@Injectable()
export class BkpHierarchyService {
  constructor(
    @InjectRepository(BkpHierarchyEntity)
    private costRepository: Repository<BkpHierarchyEntity>,
    @InjectRepository(BKPCostEntity)
    private BKPCostRepository: Repository<BKPCostEntity>,
    @InjectRepository(BKPCostFilesEntity)
    private BKPCostFilesRepository: Repository<BKPCostFilesEntity>,
    private referenceService: ReferenceService,

  ) { }

  public async createBkpHierarchy(createBkpHierarchyInput: CreateBkpHierarchyInput, referenceFilter: ReferenceFilterParams): Promise<BkpHierarchyEntity> {
    try {
      const { BKPCosts,bkpMain } = createBkpHierarchyInput;
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const costDetail = new BkpHierarchyEntity({bkpMain});
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
  const myBkp = await this.costRepository.find({where:{bkpMain:Like(`%${bkp.bkpMain}%`)}, relations: ['BKPCosts' ]})
  return myBkp
} 


}

