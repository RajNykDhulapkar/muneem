import {MigrationInterface, QueryRunner} from "typeorm";

export class user1658775935077 implements MigrationInterface {
    name = 'user1658775935077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isEmailConfirmed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isEmailConfirmed"`);
    }

}
