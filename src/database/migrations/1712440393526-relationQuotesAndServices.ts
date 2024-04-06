import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationQuotesAndServices1712440393526 implements MigrationInterface {
    name = 'RelationQuotesAndServices1712440393526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" RENAME COLUMN "servicesQuotesId" TO "serviceId"`);
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "serviceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_589bfd8bb97a6e9e3d8f04490fd" FOREIGN KEY ("serviceId") REFERENCES "services_quotes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_589bfd8bb97a6e9e3d8f04490fd"`);
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "serviceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote" RENAME COLUMN "serviceId" TO "servicesQuotesId"`);
    }

}
