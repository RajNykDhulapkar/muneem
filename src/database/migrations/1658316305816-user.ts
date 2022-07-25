import {MigrationInterface, QueryRunner} from "typeorm";

export class user1658316305816 implements MigrationInterface {
    name = 'user1658316305816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "currentHashedRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "currentHashedRefreshToken"`);
    }

}
