import {MigrationInterface, QueryRunner} from "typeorm";

export class projects1612535894105 implements MigrationInterface {
    name = 'projects1612535894105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("projectId" nvarchar(255) NOT NULL, "projectName" nvarchar(255) NOT NULL, "projectNum" int NOT NULL, "client" nvarchar(255) NOT NULL, "buildingType" nvarchar(255), "printingCom" nvarchar(255), "workType" nvarchar(255), "estCost" int, "adressLine1" nvarchar(255), "adressLine2" nvarchar(255), "city" nvarchar(255), "state" nvarchar(255), "zip" int, "country" nvarchar(255), CONSTRAINT "UQ_c9b85785128f44b7d13f87ce7d0" UNIQUE ("projectId"), CONSTRAINT "UQ_fe694901c6661550ecc084a1fc8" UNIQUE ("projectName"), CONSTRAINT "UQ_2fcef77e806c8cf5b640f39f685" UNIQUE ("projectNum"), CONSTRAINT "PK_c9b85785128f44b7d13f87ce7d0" PRIMARY KEY ("projectId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
