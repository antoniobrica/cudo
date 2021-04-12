import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PeopleEntity } from "../../../entities/people.entity";
import { CreateFileUserInput } from "../dto/create-fileuser.input";

@Injectable()
export class FileUserService {
  constructor(
    @InjectRepository(PeopleEntity)
    private fileUserRepository: Repository<PeopleEntity>,
  ) { }

  create(createFileUserData: CreateFileUserInput): Promise<PeopleEntity> {
    return this.fileUserRepository.save(createFileUserData);
  }

  findAll(): Promise<PeopleEntity[]> {
    return this.fileUserRepository.find();
  }

  findOne(id: number): Promise<PeopleEntity> {
    return this.fileUserRepository.findOne(id);
  }

}