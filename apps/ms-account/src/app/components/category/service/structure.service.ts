import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, getTreeRepository, Repository, TreeRepository } from 'typeorm';
import { Structure } from '../../../entities/structure.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { StructureFilterArgs } from '../dto/args/structure-filter.args';
import { CreateStructureInput } from '../dto/create-Structure.input';
import { UpdateStructureInput } from '../dto/update-Structure.input';




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
        parentStructure = new Structure();
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
        childStructure = new Structure();
        childStructure.structureName = createStructureInput.childStructureName;
        childStructure.parent = parentStructure;
        childStructure.referenceID = referenceFilter.referenceID;
        childStructure.referenceType = referenceFilter.referenceType;
        await manager.save(childStructure);
      }
      const trees = await manager.getTreeRepository(Structure).findDescendantsTree(parentStructure);
      console.log(JSON.stringify(trees))
      return trees;
    } catch (error) {
      return error;
    }
  }

  public async updateStructure(updateStructure: UpdateStructureInput, referenceFilter: ReferenceFilterParams): Promise<Structure> {
    const manager = getManager();
    let parentStructure;
    if (updateStructure.parentStructureID) {
      parentStructure = new Structure();
      parentStructure.id = updateStructure.parentStructureID;
      parentStructure.referenceID = referenceFilter.referenceID;
      parentStructure.referenceType = referenceFilter.referenceType;
    }
    else {
      throw new HttpException('Parent Structure Not Provided', HttpStatus.NOT_FOUND);
    }
    let childStructure;
    if (updateStructure.childStructureName) {
      childStructure = new Structure();
      childStructure.structureName = updateStructure.childStructureName;
      childStructure.parent = parentStructure;
      childStructure.referenceID = referenceFilter.referenceID;
      childStructure.referenceType = referenceFilter.referenceType;
      await manager.save(childStructure);
    }
    const trees = await manager.getTreeRepository(Structure).findDescendantsTree(parentStructure);
    console.log(JSON.stringify(trees))
    return trees;
  }

  public async findStructureRoots(refFilter: ReferenceFilterParams): Promise<Structure[]> {
    const manager = getManager();
    const trees = await manager.getTreeRepository(Structure).findRoots();
    return trees.filter(tree => (tree.referenceID == refFilter.referenceID && tree.referenceType == refFilter.referenceType));
  }

  public async findStructureChilds(structureFilterArgs: StructureFilterArgs): Promise<Structure> {
    const manager = getManager();
    const filterStructure = new Structure();
    filterStructure.id = structureFilterArgs.structureID;
    const trees = await manager.getTreeRepository(Structure).findDescendantsTree(filterStructure);
    console.log(trees)
    return trees;
  }

  // public async deleteStructure(updateStructure: UpdateStructureInput, referenceFilter: ReferenceFilterParams): Promise<Structure> {
  //   const manager = getManager();
  //   const filterStructure = new Structure();
  //   filterStructure.id = updateStructure.parentStructureID;
  //   const a = await manager.getTreeRepository(Structure).remove(filterStructure);
  //   console.log(a);
  //   const trees = await manager.getTreeRepository(Structure).findDescendantsTree(filterStructure);
  //   return trees;
  // }
}


