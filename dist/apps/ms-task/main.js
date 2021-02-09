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

/***/ "./apps/ms-task/src/app/app.controller.ts":
/*!************************************************!*\
  !*** ./apps/ms-task/src/app/app.controller.ts ***!
  \************************************************/
/*! exports provided: AppController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppController", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.service */ "./apps/ms-task/src/app/app.service.ts");
var _a;



let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"] !== "undefined" && _app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"]) === "function" ? _a : Object])
], AppController);



/***/ }),

/***/ "./apps/ms-task/src/app/app.module.ts":
/*!********************************************!*\
  !*** ./apps/ms-task/src/app/app.module.ts ***!
  \********************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.controller */ "./apps/ms-task/src/app/app.controller.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.service */ "./apps/ms-task/src/app/app.service.ts");
/* harmony import */ var _config_typeorm_type_orm_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/typeorm/type-orm.service */ "./apps/ms-task/src/config/typeorm/type-orm.service.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/components.module */ "./apps/ms-task/src/app/components/components.module.ts");








// import { TasksModule } from './task/task.module';
// import { UserModule } from './components/user/user.module';
let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLModule"].forRoot({
                context: ({ req, connection }) => connection ? { req: connection.context } : { req },
                autoSchemaFile: true,
            }),
            // TaskModule,
            // TasksModule,
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["TypeOrmModule"].forRootAsync({
                useClass: _config_typeorm_type_orm_service__WEBPACK_IMPORTED_MODULE_6__["TypeOrmService"],
            }),
            // UserModule,
            _components_components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"]
        ],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_4__["AppController"]],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_5__["AppService"]],
    })
], AppModule);



/***/ }),

/***/ "./apps/ms-task/src/app/app.service.ts":
/*!*********************************************!*\
  !*** ./apps/ms-task/src/app/app.service.ts ***!
  \*********************************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let AppService = class AppService {
    getData() {
        return { message: 'Welcome to ms-task!' };
    }
};
AppService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AppService);



/***/ }),

/***/ "./apps/ms-task/src/app/components/components.module.ts":
/*!**************************************************************!*\
  !*** ./apps/ms-task/src/app/components/components.module.ts ***!
  \**************************************************************/
/*! exports provided: ComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function() { return ComponentsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _project_tasks_project_tasks_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-tasks/project-tasks.module */ "./apps/ms-task/src/app/components/project-tasks/project-tasks.module.ts");



let ComponentsModule = class ComponentsModule {
};
ComponentsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_project_tasks_project_tasks_module__WEBPACK_IMPORTED_MODULE_2__["ProjectTasksModule"]],
        providers: []
    })
], ComponentsModule);



/***/ }),

/***/ "./apps/ms-task/src/app/components/project-tasks/dto/input/create-project-task.input.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/ms-task/src/app/components/project-tasks/dto/input/create-project-task.input.ts ***!
  \**********************************************************************************************/
/*! exports provided: CreateProjectTaskInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateProjectTaskInput", function() { return CreateProjectTaskInput; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);



let CreateProjectTaskInput = class CreateProjectTaskInput {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "ParentTaskID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "ChildTaskID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "TaskTitle", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "StartDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "EndDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "EstimatedDays", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "SendNotification", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "SaveTaskAsTemplate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "BKPID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "PhasesID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "CreatedOn", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "CreatedBy", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], CreateProjectTaskInput.prototype, "UpdatedOn", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "UpdatedBy", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "IsDeleted", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "ReferenceID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "ReferenceTypeID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name` }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectTaskInput.prototype, "Status", void 0);
CreateProjectTaskInput = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["InputType"])()
], CreateProjectTaskInput);



/***/ }),

/***/ "./apps/ms-task/src/app/components/project-tasks/interface/project-tasks-repository.interface.ts":
/*!*******************************************************************************************************!*\
  !*** ./apps/ms-task/src/app/components/project-tasks/interface/project-tasks-repository.interface.ts ***!
  \*******************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./apps/ms-task/src/app/components/project-tasks/project-tasks.module.ts":
/*!*******************************************************************************!*\
  !*** ./apps/ms-task/src/app/components/project-tasks/project-tasks.module.ts ***!
  \*******************************************************************************/
/*! exports provided: ProjectTasksModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectTasksModule", function() { return ProjectTasksModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _service_project_tasks_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service/project-tasks.service */ "./apps/ms-task/src/app/components/project-tasks/service/project-tasks.service.ts");
/* harmony import */ var _resolver_project_tasks_resolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolver/project-tasks.resolver */ "./apps/ms-task/src/app/components/project-tasks/resolver/project-tasks.resolver.ts");
/* harmony import */ var _repository_project_tasks_repository_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./repository/project-tasks-repository.service */ "./apps/ms-task/src/app/components/project-tasks/repository/project-tasks-repository.service.ts");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _entities_project_tasks_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../entities/project-tasks.entity */ "./apps/ms-task/src/app/entities/project-tasks.entity.ts");







let ProjectTasksModule = class ProjectTasksModule {
};
ProjectTasksModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__["TypeOrmModule"].forFeature([_entities_project_tasks_entity__WEBPACK_IMPORTED_MODULE_6__["ProjectTasksEntity"]])],
        providers: [_resolver_project_tasks_resolver__WEBPACK_IMPORTED_MODULE_3__["ProjectTasksResolver"],
            {
                provide: 'IProjectTasksRepository',
                useClass: _repository_project_tasks_repository_service__WEBPACK_IMPORTED_MODULE_4__["ProjectTasksRepositoryService"],
            },
            {
                provide: 'IProjectTasksService',
                useClass: _service_project_tasks_service__WEBPACK_IMPORTED_MODULE_2__["ProjectTasksService"],
            }]
    })
], ProjectTasksModule);



/***/ }),

/***/ "./apps/ms-task/src/app/components/project-tasks/repository/project-tasks-repository.service.ts":
/*!******************************************************************************************************!*\
  !*** ./apps/ms-task/src/app/components/project-tasks/repository/project-tasks-repository.service.ts ***!
  \******************************************************************************************************/
/*! exports provided: ProjectTasksRepositoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectTasksRepositoryService", function() { return ProjectTasksRepositoryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _entities_project_tasks_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../entities/project-tasks.entity */ "./apps/ms-task/src/app/entities/project-tasks.entity.ts");
/* harmony import */ var _repositories_base_base_abstract_repository__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../repositories/base/base-abstract-repository */ "./apps/ms-task/src/app/repositories/base/base-abstract-repository.ts");
var _a;






let ProjectTasksRepositoryService = class ProjectTasksRepositoryService extends _repositories_base_base_abstract_repository__WEBPACK_IMPORTED_MODULE_5__["BaseAbstractRepository"] {
    constructor(projectRepository) {
        super(projectRepository);
        this.projectRepository = projectRepository;
    }
};
ProjectTasksRepositoryService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__["InjectRepository"])(_entities_project_tasks_entity__WEBPACK_IMPORTED_MODULE_4__["ProjectTasksEntity"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_3__["Repository"] !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_3__["Repository"]) === "function" ? _a : Object])
], ProjectTasksRepositoryService);



/***/ }),

/***/ "./apps/ms-task/src/app/components/project-tasks/resolver/project-tasks.resolver.ts":
/*!******************************************************************************************!*\
  !*** ./apps/ms-task/src/app/components/project-tasks/resolver/project-tasks.resolver.ts ***!
  \******************************************************************************************/
/*! exports provided: ProjectTasksResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectTasksResolver", function() { return ProjectTasksResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entities_project_tasks_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../entities/project-tasks.entity */ "./apps/ms-task/src/app/entities/project-tasks.entity.ts");
/* harmony import */ var _models_project_tasks_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../models/project-tasks.model */ "./apps/ms-task/src/app/models/project-tasks.model.ts");
/* harmony import */ var _dto_input_create_project_task_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dto/input/create-project-task.input */ "./apps/ms-task/src/app/components/project-tasks/dto/input/create-project-task.input.ts");
/* harmony import */ var _service_project_tasks_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service/project-tasks.service */ "./apps/ms-task/src/app/components/project-tasks/service/project-tasks.service.ts");
var _a, _b, _c;







let ProjectTasksResolver = class ProjectTasksResolver {
    constructor(projectTasksService) {
        this.projectTasksService = projectTasksService;
    }
    getProjectTasks() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.projectTasksService.findAll();
        });
    }
    createProjectTask(createProjectTaskInput) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.projectTasksService.create(createProjectTaskInput);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(() => [_entities_project_tasks_entity__WEBPACK_IMPORTED_MODULE_3__["ProjectTasksEntity"]], { nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ProjectTasksResolver.prototype, "getProjectTasks", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(() => _models_project_tasks_model__WEBPACK_IMPORTED_MODULE_4__["ProjectTasksModel"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])('newTask')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof _dto_input_create_project_task_input__WEBPACK_IMPORTED_MODULE_5__["CreateProjectTaskInput"] !== "undefined" && _dto_input_create_project_task_input__WEBPACK_IMPORTED_MODULE_5__["CreateProjectTaskInput"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], ProjectTasksResolver.prototype, "createProjectTask", null);
ProjectTasksResolver = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Resolver"])(() => _models_project_tasks_model__WEBPACK_IMPORTED_MODULE_4__["ProjectTasksModel"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Inject"])('IProjectTasksService')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof _service_project_tasks_service__WEBPACK_IMPORTED_MODULE_6__["ProjectTasksService"] !== "undefined" && _service_project_tasks_service__WEBPACK_IMPORTED_MODULE_6__["ProjectTasksService"]) === "function" ? _c : Object])
], ProjectTasksResolver);



/***/ }),

/***/ "./apps/ms-task/src/app/components/project-tasks/service/project-tasks.service.ts":
/*!****************************************************************************************!*\
  !*** ./apps/ms-task/src/app/components/project-tasks/service/project-tasks.service.ts ***!
  \****************************************************************************************/
/*! exports provided: ProjectTasksService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectTasksService", function() { return ProjectTasksService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _interface_project_tasks_repository_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../interface/project-tasks-repository.interface */ "./apps/ms-task/src/app/components/project-tasks/interface/project-tasks-repository.interface.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
var _a;




let ProjectTasksService = class ProjectTasksService {
    constructor(projectTasksRepository) {
        this.projectTasksRepository = projectTasksRepository;
    }
    create(createProjectTaskInput) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const projectTasksEntity = Object.assign({ TaskID: Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v4"])() }, createProjectTaskInput);
            return yield this.projectTasksRepository.create(projectTasksEntity);
        });
    }
    findAll() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.projectTasksRepository.findAll();
        });
    }
};
ProjectTasksService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Inject"])('IProjectTasksRepository')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _interface_project_tasks_repository_interface__WEBPACK_IMPORTED_MODULE_2__["IProjectTasksRepository"] !== "undefined" && _interface_project_tasks_repository_interface__WEBPACK_IMPORTED_MODULE_2__["IProjectTasksRepository"]) === "function" ? _a : Object])
], ProjectTasksService);



/***/ }),

/***/ "./apps/ms-task/src/app/entities/project-tasks.entity.ts":
/*!***************************************************************!*\
  !*** ./apps/ms-task/src/app/entities/project-tasks.entity.ts ***!
  \***************************************************************/
/*! exports provided: ProjectTasksEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectTasksEntity", function() { return ProjectTasksEntity; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__);



let ProjectTasksEntity = class ProjectTasksEntity {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ unique: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["PrimaryColumn"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "TaskID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "ParentTaskID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "ChildTaskID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "TaskTitle", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "StartDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "EndDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "EstimatedDays", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "SendNotification", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "SaveTaskAsTemplate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "BKPID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "PhasesID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "CreatedOn", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "CreatedBy", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], ProjectTasksEntity.prototype, "UpdatedOn", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "UpdatedBy", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "IsDeleted", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "ReferenceID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "ReferenceTypeID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksEntity.prototype, "Status", void 0);
ProjectTasksEntity = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["ObjectType"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({ name: 'ProjectTasks' })
], ProjectTasksEntity);



/***/ }),

/***/ "./apps/ms-task/src/app/models/project-tasks.model.ts":
/*!************************************************************!*\
  !*** ./apps/ms-task/src/app/models/project-tasks.model.ts ***!
  \************************************************************/
/*! exports provided: ProjectTasksModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectTasksModel", function() { return ProjectTasksModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__);


let ProjectTasksModel = class ProjectTasksModel {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "TaskID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "ParentTaskID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "ChildTaskID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "TaskTitle", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "StartDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "EndDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "EstimatedDays", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "SendNotification", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "SaveTaskAsTemplate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "BKPID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "PhasesID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "CreatedOn", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "CreatedBy", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], ProjectTasksModel.prototype, "UpdatedOn", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "UpdatedBy", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "IsDeleted", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "ReferenceID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "ReferenceTypeID", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectTasksModel.prototype, "Status", void 0);
ProjectTasksModel = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["ObjectType"])()
], ProjectTasksModel);



/***/ }),

/***/ "./apps/ms-task/src/app/repositories/base/base-abstract-repository.ts":
/*!****************************************************************************!*\
  !*** ./apps/ms-task/src/app/repositories/base/base-abstract-repository.ts ***!
  \****************************************************************************/
/*! exports provided: BaseAbstractRepository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAbstractRepository", function() { return BaseAbstractRepository; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);

class BaseAbstractRepository {
    constructor(entity) {
        this.entity = entity;
    }
    create(data) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.entity.save(data);
        });
    }
    findOneById(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.entity.findOne(id);
        });
    }
    findByCondition(filterCondition) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.entity.findOne({ where: filterCondition });
        });
    }
    findWithRelations(relations) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.entity.find(relations);
        });
    }
    findAll() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.entity.find();
        });
    }
    remove(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.entity.delete(id);
        });
    }
}


/***/ }),

/***/ "./apps/ms-task/src/config.orm.ts":
/*!****************************************!*\
  !*** ./apps/ms-task/src/config.orm.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import { NODE_ENV, MONGO_URL, MONGO_PORT, MONGO_DB } from '@environments'
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
/* harmony default export */ __webpack_exports__["default"] = (orm["development"]);


/***/ }),

/***/ "./apps/ms-task/src/config/typeorm/type-orm.service.ts":
/*!*************************************************************!*\
  !*** ./apps/ms-task/src/config/typeorm/type-orm.service.ts ***!
  \*************************************************************/
/*! exports provided: TypeOrmService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeOrmService", function() { return TypeOrmService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_orm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config.orm */ "./apps/ms-task/src/config.orm.ts");




// import { logger } from '../../common'
let TypeOrmService = class TypeOrmService {
    createTypeOrmOptions() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const options = Object.assign(Object.assign({}, _config_orm__WEBPACK_IMPORTED_MODULE_3__["default"]), { entities: Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["getMetadataArgsStorage"])().tables.map(tbl => tbl.target), migrations: ["src/app/migration/**/*.ts"], subscribers: ["src/app/subscriber/**/*.ts"], cli: {
                    entitiesDir: "src/app/entity",
                    migrationsDir: "src/app/migration",
                    subscribersDir: "src/app/subscriber"
                }, synchronize: false, autoLoadEntities: true, useNewUrlParser: true, useUnifiedTopology: true, keepConnectionAlive: true, logging: true });
            return options;
        });
    }
};
TypeOrmService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], TypeOrmService);



/***/ }),

/***/ "./apps/ms-task/src/main.ts":
/*!**********************************!*\
  !*** ./apps/ms-task/src/main.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./apps/ms-task/src/app/app.module.ts");
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */




// import {Constants} from '@cudo/ms-core'
function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_2__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"]);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].log('Listening at http://localhost:' + port + '/' + globalPrefix);
            // Logger.log(Constants.LISTENING_AT + port + '/' + globalPrefix);
        });
    });
}
bootstrap();


/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./apps/ms-task/src/main.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/dishant/Desktop/Project%20Management/apps/ms-task/src/main.ts */"./apps/ms-task/src/main.ts");


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