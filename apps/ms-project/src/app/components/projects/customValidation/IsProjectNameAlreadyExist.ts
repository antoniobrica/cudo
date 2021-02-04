// import {
//     registerDecorator,
//     ValidationOptions,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//     ValidationArguments,
//   } from 'class-validator';
// import { CreateDateColumn } from 'typeorm';
// import { ProjectServiceInterface } from 'apps/ms-project/src/app/components/projects/interface/project.service.interface';


//   @ValidatorConstraint({ async: true })
//   export class IsProjectNameAlreadyExistConstraint implements ValidatorConstraintInterface {
//     validate(projectName: string) {

//       return ProjectServiceInterface.findOneById({ where: { projectName }}).then(project =>{
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

