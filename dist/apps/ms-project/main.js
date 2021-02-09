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
/*! exports provided: AppController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppController", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.service */ "./apps/ms-project/src/app/app.service.ts");
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

/***/ "./apps/ms-project/src/app/app.module.ts":
/*!***********************************************!*\
  !*** ./apps/ms-project/src/app/app.module.ts ***!
  \***********************************************/
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
/* harmony import */ var _config_typeorm_type_orm_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config/typeorm/type-orm.service */ "./apps/ms-project/src/config/typeorm/type-orm.service.ts");
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.controller */ "./apps/ms-project/src/app/app.controller.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.service */ "./apps/ms-project/src/app/app.service.ts");
/* harmony import */ var _components_projects_projects_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/projects/projects.module */ "./apps/ms-project/src/app/components/projects/projects.module.ts");








// import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
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
            _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLModule"].forRoot({
                context: ({ req, connection }) => connection ? { req: connection.context } : { req },
                autoSchemaFile: true,
            }),
            _components_projects_projects_module__WEBPACK_IMPORTED_MODULE_7__["ProjectsModule"],
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["TypeOrmModule"].forRootAsync({
                useClass: _config_typeorm_type_orm_service__WEBPACK_IMPORTED_MODULE_4__["TypeOrmService"],
            }),
        ],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_5__["AppController"]],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_6__["AppService"]],
    })
], AppModule);



/***/ }),

/***/ "./apps/ms-project/src/app/app.service.ts":
/*!************************************************!*\
  !*** ./apps/ms-project/src/app/app.service.ts ***!
  \************************************************/
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
        return { message: 'Welcome to ms-project!' };
    }
};
AppService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AppService);



/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/dto/input/create-project.input.ts":
/*!***************************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/dto/input/create-project.input.ts ***!
  \***************************************************************************************/
/*! exports provided: CreateProjectInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateProjectInput", function() { return CreateProjectInput; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);




let CreateProjectInput = class CreateProjectInput {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Length"])(1, 20),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])({ type: "text", unique: true }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsNotEmpty"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["PrimaryColumn"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "projectName", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])({ unique: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["PrimaryColumn"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsNotEmpty"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "projectNum", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ description: `Client Name`, deprecationReason: 'Optional While Updating' }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Length"])(1, 10),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsNotEmpty"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "client", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Length"])(0, 10),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "buildingType", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Length"])(0, 10),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "printingCom", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "workType", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "estCost", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "adressLine1", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "adressLine2", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "city", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "state", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "zip", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "country", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsOptional"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateProjectInput.prototype, "description", void 0);
CreateProjectInput = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["InputType"])()
], CreateProjectInput);



/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/interface/project.repository.interface.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/interface/project.repository.interface.ts ***!
  \***********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/models/project.ts":
/*!***********************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/models/project.ts ***!
  \***********************************************************************/
/*! exports provided: Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__);


let Project = class Project {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "projectId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "projectName", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "projectNum", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "client", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "buildingType", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "printingCom", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "workType", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "estCost", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "adressLine1", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "adressLine2", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "city", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "state", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "zip", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "country", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["Field"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Project.prototype, "description", void 0);
Project = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["ObjectType"])()
], Project);



/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/projects-repository/projects-repository.service.ts":
/*!********************************************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/projects-repository/projects-repository.service.ts ***!
  \********************************************************************************************************/
/*! exports provided: ProjectsRepositoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsRepositoryService", function() { return ProjectsRepositoryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _entities_project_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../entities/project.entity */ "./apps/ms-project/src/app/entities/project.entity.ts");
/* harmony import */ var _repositories_base_base_abstract_repository__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../repositories/base/base-abstract-repository */ "./apps/ms-project/src/app/repositories/base/base-abstract-repository.ts");
var _a;






let ProjectsRepositoryService = class ProjectsRepositoryService extends _repositories_base_base_abstract_repository__WEBPACK_IMPORTED_MODULE_5__["BaseAbstractRepository"] {
    constructor(projectRepository) {
        super(projectRepository);
        this.projectRepository = projectRepository;
    }
};
ProjectsRepositoryService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__["InjectRepository"])(_entities_project_entity__WEBPACK_IMPORTED_MODULE_4__["ProjectEntity"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_3__["Repository"] !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_3__["Repository"]) === "function" ? _a : Object])
], ProjectsRepositoryService);



/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/projects.module.ts":
/*!************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/projects.module.ts ***!
  \************************************************************************/
/*! exports provided: ProjectsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsModule", function() { return ProjectsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _projects_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects.resolver */ "./apps/ms-project/src/app/components/projects/projects.resolver.ts");
/* harmony import */ var _projects_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projects.service */ "./apps/ms-project/src/app/components/projects/projects.service.ts");
/* harmony import */ var _projects_repository_projects_repository_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projects-repository/projects-repository.service */ "./apps/ms-project/src/app/components/projects/projects-repository/projects-repository.service.ts");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _entities_project_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../entities/project.entity */ "./apps/ms-project/src/app/entities/project.entity.ts");







let ProjectsModule = class ProjectsModule {
};
ProjectsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__["TypeOrmModule"].forFeature([_entities_project_entity__WEBPACK_IMPORTED_MODULE_6__["ProjectEntity"]])],
        providers: [_projects_resolver__WEBPACK_IMPORTED_MODULE_2__["ProjectsResolver"], {
                provide: 'ProjectRepositoryInterface',
                useClass: _projects_repository_projects_repository_service__WEBPACK_IMPORTED_MODULE_4__["ProjectsRepositoryService"],
            },
            {
                provide: 'ProjectServiceInterface',
                useClass: _projects_service__WEBPACK_IMPORTED_MODULE_3__["ProjectsService"],
            }],
    })
], ProjectsModule);



/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/projects.resolver.ts":
/*!**************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/projects.resolver.ts ***!
  \**************************************************************************/
/*! exports provided: ProjectsResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsResolver", function() { return ProjectsResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dto_input_create_project_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dto/input/create-project.input */ "./apps/ms-project/src/app/components/projects/dto/input/create-project.input.ts");
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/project */ "./apps/ms-project/src/app/components/projects/models/project.ts");
/* harmony import */ var _projects_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projects.service */ "./apps/ms-project/src/app/components/projects/projects.service.ts");
var _a, _b, _c;






let ProjectsResolver = class ProjectsResolver {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    getProjects() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.projectsService.findAll();
        });
    }
    createNewProject(newProjectInputObject) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.projectsService.create(newProjectInputObject);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(() => [_models_project__WEBPACK_IMPORTED_MODULE_4__["Project"]], { nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ProjectsResolver.prototype, "getProjects", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(() => _models_project__WEBPACK_IMPORTED_MODULE_4__["Project"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])('newProjectInputObject')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof _dto_input_create_project_input__WEBPACK_IMPORTED_MODULE_3__["CreateProjectInput"] !== "undefined" && _dto_input_create_project_input__WEBPACK_IMPORTED_MODULE_3__["CreateProjectInput"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], ProjectsResolver.prototype, "createNewProject", null);
ProjectsResolver = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Resolver"])(() => _models_project__WEBPACK_IMPORTED_MODULE_4__["Project"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Inject"])('ProjectServiceInterface')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof _projects_service__WEBPACK_IMPORTED_MODULE_5__["ProjectsService"] !== "undefined" && _projects_service__WEBPACK_IMPORTED_MODULE_5__["ProjectsService"]) === "function" ? _c : Object])
], ProjectsResolver);



/***/ }),

/***/ "./apps/ms-project/src/app/components/projects/projects.service.ts":
/*!*************************************************************************!*\
  !*** ./apps/ms-project/src/app/components/projects/projects.service.ts ***!
  \*************************************************************************/
/*! exports provided: ProjectsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsService", function() { return ProjectsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _interface_project_repository_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interface/project.repository.interface */ "./apps/ms-project/src/app/components/projects/interface/project.repository.interface.ts");
var _a;




let ProjectsService = class ProjectsService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    create(createProjectInput) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const projectEntity = Object.assign({ projectId: Object(uuid__WEBPACK_IMPORTED_MODULE_2__["v4"])() }, createProjectInput);
                return yield this.projectRepository.create(projectEntity);
            }
            catch (error) {
                throw 'Invalid Input';
            }
        });
    }
    findAll() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.projectRepository.findAll();
        });
    }
};
ProjectsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Inject"])('ProjectRepositoryInterface')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _interface_project_repository_interface__WEBPACK_IMPORTED_MODULE_3__["ProjectRepositoryInterface"] !== "undefined" && _interface_project_repository_interface__WEBPACK_IMPORTED_MODULE_3__["ProjectRepositoryInterface"]) === "function" ? _a : Object])
], ProjectsService);



/***/ }),

/***/ "./apps/ms-project/src/app/entities/project.entity.ts":
/*!************************************************************!*\
  !*** ./apps/ms-project/src/app/entities/project.entity.ts ***!
  \************************************************************/
/*! exports provided: ProjectEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectEntity", function() { return ProjectEntity; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__);



let ProjectEntity = class ProjectEntity {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ unique: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["PrimaryColumn"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "projectId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ unique: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "projectName", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ unique: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], ProjectEntity.prototype, "projectNum", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "client", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "buildingType", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "printingCom", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "workType", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], ProjectEntity.prototype, "estCost", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "adressLine1", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "adressLine2", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "city", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "state", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], ProjectEntity.prototype, "zip", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "country", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Field"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ProjectEntity.prototype, "description", void 0);
ProjectEntity = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["ObjectType"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({ name: 'projects' })
], ProjectEntity);



/***/ }),

/***/ "./apps/ms-project/src/app/repositories/base/base-abstract-repository.ts":
/*!*******************************************************************************!*\
  !*** ./apps/ms-project/src/app/repositories/base/base-abstract-repository.ts ***!
  \*******************************************************************************/
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

/***/ "./apps/ms-project/src/config.orm.ts":
/*!*******************************************!*\
  !*** ./apps/ms-project/src/config.orm.ts ***!
  \*******************************************/
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
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
};
/* harmony default export */ __webpack_exports__["default"] = (orm["development"]);


/***/ }),

/***/ "./apps/ms-project/src/config/typeorm/type-orm.service.ts":
/*!****************************************************************!*\
  !*** ./apps/ms-project/src/config/typeorm/type-orm.service.ts ***!
  \****************************************************************/
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
/* harmony import */ var _config_orm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config.orm */ "./apps/ms-project/src/config.orm.ts");




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

/***/ "./apps/ms-project/src/main.ts":
/*!*************************************!*\
  !*** ./apps/ms-project/src/main.ts ***!
  \*************************************/
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
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./apps/ms-project/src/app/app.module.ts");
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */




function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_2__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"]);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        app.useGlobalPipes(new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["ValidationPipe"]());
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].log('Listening at http://localhost:' + port + '/' + globalPrefix);
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

module.exports = __webpack_require__(/*! C:\Users\VipinKumar\Desktop\office-project\CudoApp\Project%20Management\apps\ms-project\src\main.ts */"./apps/ms-project/src/main.ts");


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