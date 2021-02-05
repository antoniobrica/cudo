(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/ms-project/src/app/app.controller.ts":
/*!***************************************************!*\
  !*** ./apps/ms-project/src/app/app.controller.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/ms-project/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    common_1.Controller(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/ms-project/src/app/app.module.ts":
/*!***********************************************!*\
  !*** ./apps/ms-project/src/app/app.module.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const type_orm_service_1 = __webpack_require__(/*! ../config/typeorm/type-orm.service */ "./apps/ms-project/src/config/typeorm/type-orm.service.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/ms-project/src/app/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/ms-project/src/app/app.service.ts");
const projects_module_1 = __webpack_require__(/*! ./components/projects/projects.module */ "./apps/ms-project/src/app/components/projects/projects.module.ts");
// import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            // I18nModule.forRoot({
            //   fallbackLanguage: 'en',
            //   parser: I18nJsonParser,
            //   parserOptions: {
            //     path: path.join(__dirname, '/assets/i18n/'),
            //     // add this to enable live translations
            //     watch: true,
            //   },
            // }),
            graphql_1.GraphQLModule.forRoot({
                context: ({ req, connection }) => connection ? { req: connection.context } : { req },
                autoSchemaFile: true,
            }),
            projects_module_1.ProjectsModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: type_orm_service_1.TypeOrmService,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/ms-project/src/app/app.service.ts":
/*!************************************************!*\
  !*** ./apps/ms-project/src/app/app.service.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to ms-project!' };
    }
};
AppService = tslib_1.__decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/dto/input/create-project.input.ts":
/*!***************************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/dto/input/create-project.input.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectInput = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let CreateProjectInput = class CreateProjectInput {
};
tslib_1.__decorate([
    graphql_1.Field(),
    class_validator_1.Length(1, 20),
    typeorm_1.Column({ type: "text", unique: true }),
    class_validator_1.IsNotEmpty(),
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "projectName", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ type: "int", unique: true }),
    typeorm_1.PrimaryColumn(),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateProjectInput.prototype, "projectNum", void 0);
tslib_1.__decorate([
    graphql_1.Field({ description: `Client Name`, deprecationReason: 'Optional While Updating' }),
    class_validator_1.Length(1, 10),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "client", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Length(0, 10),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "buildingType", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Length(0, 10),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "printingCom", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "workType", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Number)
], CreateProjectInput.prototype, "estCost", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "adressLine1", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "adressLine2", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "city", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "state", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Number)
], CreateProjectInput.prototype, "zip", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProjectInput.prototype, "country", void 0);
CreateProjectInput = tslib_1.__decorate([
    graphql_1.InputType()
], CreateProjectInput);
exports.CreateProjectInput = CreateProjectInput;


/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/interface/project.repository.interface.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/interface/project.repository.interface.ts ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/models/project.ts":
/*!***********************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/models/project.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
let Project = class Project {
};
tslib_1.__decorate([
    graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "projectId", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "projectName", void 0);
tslib_1.__decorate([
    graphql_1.Field(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "projectNum", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "client", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "buildingType", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "printingCom", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "workType", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "estCost", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "adressLine1", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "adressLine2", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "city", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "state", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "zip", void 0);
tslib_1.__decorate([
    graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "country", void 0);
Project = tslib_1.__decorate([
    graphql_1.ObjectType()
], Project);
exports.Project = Project;


/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/projects-repository/projects-repository.service.ts":
/*!********************************************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/projects-repository/projects-repository.service.ts ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsRepositoryService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const project_entity_1 = __webpack_require__(/*! ../../../entities/project.entity */ "./apps/ms-project/src/app/entities/project.entity.ts");
const base_abstract_repository_1 = __webpack_require__(/*! ../../../repositories/base/base-abstract-repository */ "./apps/ms-project/src/app/repositories/base/base-abstract-repository.ts");
let ProjectsRepositoryService = class ProjectsRepositoryService extends base_abstract_repository_1.BaseAbstractRepository {
    constructor(projectRepository) {
        super(projectRepository);
        this.projectRepository = projectRepository;
    }
};
ProjectsRepositoryService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(project_entity_1.ProjectEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProjectsRepositoryService);
exports.ProjectsRepositoryService = ProjectsRepositoryService;


/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/projects.module.ts":
/*!************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/projects.module.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const projects_resolver_1 = __webpack_require__(/*! ./projects.resolver */ "./apps/ms-project/src/app/components/projects/projects.resolver.ts");
const projects_service_1 = __webpack_require__(/*! ./projects.service */ "./apps/ms-project/src/app/components/projects/projects.service.ts");
const projects_repository_service_1 = __webpack_require__(/*! ./projects-repository/projects-repository.service */ "./apps/ms-project/src/app/components/projects/projects-repository/projects-repository.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const project_entity_1 = __webpack_require__(/*! ../../entities/project.entity */ "./apps/ms-project/src/app/entities/project.entity.ts");
let ProjectsModule = class ProjectsModule {
};
ProjectsModule = tslib_1.__decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.ProjectEntity])],
        providers: [projects_resolver_1.ProjectsResolver, {
                provide: 'ProjectRepositoryInterface',
                useClass: projects_repository_service_1.ProjectsRepositoryService,
            },
            {
                provide: 'ProjectServiceInterface',
                useClass: projects_service_1.ProjectsService,
            }],
    })
], ProjectsModule);
exports.ProjectsModule = ProjectsModule;


/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/projects.resolver.ts":
/*!**************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/projects.resolver.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const project_entity_1 = __webpack_require__(/*! ../../entities/project.entity */ "./apps/ms-project/src/app/entities/project.entity.ts");
const create_project_input_1 = __webpack_require__(/*! ./dto/input/create-project.input */ "./apps/ms-project/src/app/components/projects/dto/input/create-project.input.ts");
const project_1 = __webpack_require__(/*! ./models/project */ "./apps/ms-project/src/app/components/projects/models/project.ts");
const projects_service_1 = __webpack_require__(/*! ./projects.service */ "./apps/ms-project/src/app/components/projects/projects.service.ts");
let ProjectsResolver = class ProjectsResolver {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    getProjects() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.projectsService.findAll();
        });
    }
    createNewProject(newProjectInputObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.projectsService.create(newProjectInputObject);
        });
    }
};
tslib_1.__decorate([
    graphql_1.Query(() => [project_entity_1.ProjectEntity], { nullable: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ProjectsResolver.prototype, "getProjects", null);
tslib_1.__decorate([
    graphql_1.Mutation(() => project_1.Project),
    tslib_1.__param(0, graphql_1.Args('newProjectInputObject')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_project_input_1.CreateProjectInput !== "undefined" && create_project_input_1.CreateProjectInput) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "createNewProject", null);
ProjectsResolver = tslib_1.__decorate([
    graphql_1.Resolver(() => project_1.Project),
    tslib_1.__param(0, common_1.Inject('ProjectServiceInterface')),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof projects_service_1.ProjectsService !== "undefined" && projects_service_1.ProjectsService) === "function" ? _c : Object])
], ProjectsResolver);
exports.ProjectsResolver = ProjectsResolver;


/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/projects.service.ts":
/*!*************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/projects.service.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const project_repository_interface_1 = __webpack_require__(/*! ./interface/project.repository.interface */ "./apps/ms-project/src/app/components/projects/interface/project.repository.interface.ts");
let ProjectsService = class ProjectsService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    create(createProjectInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const projectEntity = Object.assign({ projectId: uuid_1.v4() }, createProjectInput);
            return yield this.projectRepository.create(projectEntity);
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.findAll();
        });
    }
};
ProjectsService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, common_1.Inject('ProjectRepositoryInterface')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof project_repository_interface_1.ProjectRepositoryInterface !== "undefined" && project_repository_interface_1.ProjectRepositoryInterface) === "function" ? _a : Object])
], ProjectsService);
exports.ProjectsService = ProjectsService;


/***/ }),

/***/ "./apps/ms-project/src/app/entities/project.entity.ts":
/*!************************************************************!*\
  !*** ./apps/ms-project/src/app/entities/project.entity.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectEntity = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
let ProjectEntity = class ProjectEntity {
};
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "projectId", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "projectName", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    tslib_1.__metadata("design:type", Number)
], ProjectEntity.prototype, "projectNum", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "client", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "buildingType", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "printingCom", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "workType", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ProjectEntity.prototype, "estCost", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "adressLine1", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "adressLine2", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "city", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "state", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ProjectEntity.prototype, "zip", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProjectEntity.prototype, "country", void 0);
ProjectEntity = tslib_1.__decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity({ name: 'projects' })
], ProjectEntity);
exports.ProjectEntity = ProjectEntity;


/***/ }),

/***/ "./apps/ms-project/src/app/repositories/base/base-abstract-repository.ts":
/*!*******************************************************************************!*\
  !*** ./apps/ms-project/src/app/repositories/base/base-abstract-repository.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAbstractRepository = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
class BaseAbstractRepository {
    constructor(entity) {
        this.entity = entity;
    }
    create(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.entity.save(data);
        });
    }
    findOneById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.entity.findOne(id);
        });
    }
    findByCondition(filterCondition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.entity.findOne({ where: filterCondition });
        });
    }
    findWithRelations(relations) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.entity.find(relations);
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.entity.find();
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.entity.delete(id);
        });
    }
}
exports.BaseAbstractRepository = BaseAbstractRepository;


/***/ }),

/***/ "./apps/ms-project/src/config.orm.ts":
/*!*******************************************!*\
  !*** ./apps/ms-project/src/config.orm.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// import { NODE_ENV, MONGO_URL, MONGO_PORT, MONGO_DB } from '@environments'
Object.defineProperty(exports, "__esModule", { value: true });
const orm = {
    development: {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    },
    testing: {
        url: process.env.DATABASE_HOST
    },
    staging: {
        host: 'localhost',
        port: process.env.DATABASE_PORT,
        username: '',
        password: '',
        database: process.env.DATABASE_NAME
    },
    production: {
        url: process.env.DATABASE_HOST
    }
};
exports.default = orm["development"];


/***/ }),

/***/ "./apps/ms-project/src/config/typeorm/type-orm.service.ts":
/*!****************************************************************!*\
  !*** ./apps/ms-project/src/config/typeorm/type-orm.service.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const config_orm_1 = __webpack_require__(/*! ../../config.orm */ "./apps/ms-project/src/config.orm.ts");
// import { logger } from '../../common'
let TypeOrmService = class TypeOrmService {
    createTypeOrmOptions() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const options = Object.assign(Object.assign({}, config_orm_1.default), { entities: typeorm_1.getMetadataArgsStorage().tables.map(tbl => tbl.target), migrations: ["src/app/migration/**/*.ts"], subscribers: ["src/app/subscriber/**/*.ts"], cli: {
                    entitiesDir: "src/app/entity",
                    migrationsDir: "src/app/migration",
                    subscribersDir: "src/app/subscriber"
                }, synchronize: false, autoLoadEntities: true, useNewUrlParser: true, useUnifiedTopology: true, keepConnectionAlive: true, logging: true });
            return options;
        });
    }
};
TypeOrmService = tslib_1.__decorate([
    common_1.Injectable()
], TypeOrmService);
exports.TypeOrmService = TypeOrmService;


/***/ }),

/***/ "./apps/ms-project/src/main.ts":
/*!*************************************!*\
  !*** ./apps/ms-project/src/main.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app/app.module */ "./apps/ms-project/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        app.useGlobalPipes(new common_1.ValidationPipe());
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
        });
    });
}
bootstrap();


/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./apps/ms-project/src/main.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\AshutoshMishra\Desktop\ProjectManagementTool\Development\azureDev\ashutosh\Project Management\apps\ms-project\src\main.ts */"./apps/ms-project/src/main.ts");


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map