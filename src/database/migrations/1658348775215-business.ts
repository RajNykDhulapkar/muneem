import {MigrationInterface, QueryRunner} from "typeorm";

export class business1658348775215 implements MigrationInterface {
    name = 'business1658348775215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "business" ADD CONSTRAINT "FK_91230ea862c52e2aa78208c7bb8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business" DROP CONSTRAINT "FK_91230ea862c52e2aa78208c7bb8"`);
        await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "ownerId"`);
    }

}
