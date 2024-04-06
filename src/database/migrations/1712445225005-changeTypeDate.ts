import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypeDate1712445225005 implements MigrationInterface {
    name = 'ChangeTypeDate1712445225005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "date" date NOT NULL`);
    }

}
