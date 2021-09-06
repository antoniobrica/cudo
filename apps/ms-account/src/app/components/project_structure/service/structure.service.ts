import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, getTreeRepository, Repository, TreeRepository } from 'typeorm';
import { Structure } from '../../../entities/structure.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { StructureFilterArgs } from '../dto/args/structure-filter.args';
import { CreateStructureInput } from '../dto/create-structure.input';
import { UpdateStructureInput } from '../dto/update-structure.input';




@Injectable()
export class StructureService {
  constructor(
    @InjectRepository(Structure)
    private StructureRepository: TreeRepository<Structure>,
    private referenceService: ReferenceService,
  ) { }

  public async createStructure(createStructureInput: CreateStructureInput, referenceFilter: ReferenceFilterParams): Promise<Structure> {
    try {
      const manager = getManager();
      let parentStructure;
      if (createStructureInput.parentStructureName) {
        const isExist = await manager.getTreeRepository(Structure).findOne({
          where: {
            structureName: createStructureInput.parentStructureName,
            referenceID: referenceFilter.referenceID,
            referenceType: referenceFilter.referenceType
          }
        });
        if (isExist) {
          throw new HttpException('Parent Structure Already Exist', HttpStatus.CONFLICT);
        }
        parentStructure = new Structure({});
        parentStructure.structureName = createStructureInput.parentStructureName;
        parentStructure.referenceID = referenceFilter.referenceID;
        parentStructure.referenceType = referenceFilter.referenceType;
        await manager.save(parentStructure);
      }
      else {
        throw new HttpException('Parent Structure Not Provided', HttpStatus.NOT_FOUND);
      }
      let childStructure;
      if (createStructureInput.childStructureName) {
        childStructure = new Structure({});
        childStructure.structureName = createStructureInput.childStructureName;
        childStructure.parent = parentStructure;
        childStructure.referenceID = referenceFilter.referenceID;
        childStructure.referenceType = referenceFilter.referenceType;
        await manager.save(childStructure);
      }
      const trees = await manager.getTreeRepository(Structure).findDescendantsTree(parentStructure);
     
      return trees;
    } catch (error) {
      return error;
    }
  }

  public async updateStructure(updateStructure: UpdateStructureInput, referenceFilter: ReferenceFilterParams): Promise<Structure> {
    const manager = getManager();
    const parentStructure = await manager.getTreeRepository(Structure).findOne({ where: { structureID: updateStructure.parentStructureID } });
    if (parentStructure) {
      parentStructure.structureID = updateStructure.parentStructureID;
      parentStructure.referenceID = referenceFilter.referenceID;
      parentStructure.referenceType = referenceFilter.referenceType;
    }
    else {
      throw new HttpException('Parent Structure Not Provided', HttpStatus.NOT_FOUND);
    }
    let childStructure;
    if (updateStructure.childStructureName) {
      childStructure = new Structure({});
      childStructure.structureName = updateStructure.childStructureName;
      childStructure.parent = parentStructure;
      childStructure.referenceID = referenceFilter.referenceID;
      childStructure.referenceType = referenceFilter.referenceType;
      await manager.save(childStructure);
    }
    const trees = await manager.getTreeRepository(Structure).findDescendantsTree(parentStructure);
   
    return trees;
  }

  public async findStructureRoots(refFilter: ReferenceFilterParams): Promise<Structure[]> {
    const manager = getManager();
    const trees = await manager.getTreeRepository(Structure).findRoots();
    return trees.filter(tree => (tree.referenceID == refFilter.referenceID && tree.referenceType == refFilter.referenceType));
  }

  public async findStructureChilds(structureFilterArgs: StructureFilterArgs): Promise<Structure> {
    const manager = getManager();
    const filterStructure = await manager.getTreeRepository(Structure).findOne({ where: { structureID: structureFilterArgs.structureID } });
    const trees = await manager.getTreeRepository(Structure).findDescendantsTree(filterStructure);
   
    return trees;
  }

  // public async deleteStructure(updateStructure: UpdateStructureInput, referenceFilter: ReferenceFilterParams): Promise<Structure> {
  //   const manager = getManager();
  //   const filterStructure = await manager.getTreeRepository(Structure).findOne({ where: { structureID: updateStructure.parentStructureID } });
  //   const removedChield_clouser = await manager.createQueryBuilder().delete()
  //     .from('structure_closure')
  //     .where("id_ancestor = :id", { id: filterStructure.id })
  //     .execute();
  //   const childs = await manager.getTreeRepository(Structure).find({ where: { parent: updateStructure.parentStructureID } });
  //   childs.forEach(async element => {
  //     await manager.createQueryBuilder().delete()
  //       .from('structure_closure')
  //       .where("id_ancestor = :id", { id: element.id })
  //       .execute();
  //     const removedChield = await manager.createQueryBuilder().delete()
  //       .from('structure')
  //       .where("parentId = :id", { id: element.id })
  //       .execute();
  //   });
  //   const a = await manager.getTreeRepository(Structure).delete({ structureID: updateStructure.parentStructureID });
  
  //   const trees = await manager.getTreeRepository(Structure).findDescendantsTree(filterStructure);
  //   return trees;
  // }
}


