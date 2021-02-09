import {MigrationInterface, QueryRunner} from "typeorm";

export class test1612533010364 implements MigrationInterface {
    name = 'test1612533010364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ProjectTasks" ("TaskID" nvarchar(255) NOT NULL, "ParentTaskID" nvarchar(255), "TaskTitle" nvarchar(255), "StartDate" nvarchar(255), "EndDate" nvarchar(255), "EstimatedDays" nvarchar(255), "SendNotification" nvarchar(255), "SaveTaskAsTemplate" nvarchar(255), "BKPID" nvarchar(255), "PhasesID" nvarchar(255), "CreatedOn" nvarchar(255), "CreatedBy" nvarchar(255), "UpdatedOn" int, "UpdatedBy" nvarchar(255), "IsDeleted" nvarchar(255), "ReferenceID" nvarchar(255), "ReferenceTypeID" nvarchar(255), "Status" nvarchar(255), CONSTRAINT "UQ_fcd692422a92a54c4ad7b96344a" UNIQUE ("TaskID"), CONSTRAINT "PK_fcd692422a92a54c4ad7b96344a" PRIMARY KEY ("TaskID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ProjectTasks"`);
    }

}
