import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712429915445 implements MigrationInterface {
    name = 'Init1712429915445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services_quotes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "UQ_31e0a3cc7869a26b483d671b041" UNIQUE ("name"), CONSTRAINT "PK_8e455fb2644204f6aa107e9672b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quotes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "servicesQuotesId" uuid NOT NULL, "date" date NOT NULL, "clientName" character varying(255) NOT NULL, CONSTRAINT "PK_99a0e8bcbcd8719d3a41f23c263" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "quotes"`);
        await queryRunner.query(`DROP TABLE "services_quotes"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
