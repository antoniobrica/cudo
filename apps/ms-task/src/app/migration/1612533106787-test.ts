import {MigrationInterface, QueryRunner} from "typeorm";

export class test1612533106787 implements MigrationInterface {
    name = 'test1612533106787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectTasks" ADD "ChildTaskID" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectTasks" DROP COLUMN "ChildTaskID"`);
    }

}
