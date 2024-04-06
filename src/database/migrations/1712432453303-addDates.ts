import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDates1712432453303 implements MigrationInterface {
    name = 'AddDates1712432453303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quote" ("createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "servicesQuotesId" uuid NOT NULL, "date" date NOT NULL, "clientName" character varying(255) NOT NULL, CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "services_quotes" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "services_quotes" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_quotes" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "services_quotes" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createAt"`);
        await queryRunner.query(`DROP TABLE "quote"`);
    }

}
