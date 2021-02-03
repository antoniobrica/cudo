// import {
//     registerDecorator,
//     ValidationOptions,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//     ValidationArguments,
//   } from 'class-validator';
// import { CreateDateColumn } from 'typeorm';
// import { ProjectsRepositoryService } from '../projects-repository/projects-repository.service';

//   @ValidatorConstraint({ async: true })
//   export class IsProjectNameAlreadyExistConstraint implements ValidatorConstraintInterface {
//     validate(projectName: string) {

//       return ProjectRepositoryInterface.findOne({ where: { projectName }}).then(project =>{
//       // return CreateProjectInput.findOneByName(projectName).then(project => {
//         if (project) return false;
//         return true;
//       });
//     }
//   }
  
//   export function IsProjectNameAlreadyExist(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//       registerDecorator({
//         target: object.constructor,
//         propertyName: propertyName,
//         options: validationOptions,
//         constraints: [],
//         validator: IsProjectNameAlreadyExistConstraint,
//       });
//     };
//   }
