import {MigrationInterface, QueryRunner} from "typeorm";

export class business1658348559200 implements MigrationInterface {
    name = 'business1658348559200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying, CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "business"`);
    }

}
