import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatetables1712432670766 implements MigrationInterface {
    name = 'Updatetables1712432670766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quote" ("createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "servicesQuotesId" uuid NOT NULL, "date" date NOT NULL, "clientName" character varying(255) NOT NULL, CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services_quotes" ("createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "UQ_31e0a3cc7869a26b483d671b041" UNIQUE ("name"), CONSTRAINT "PK_8e455fb2644204f6aa107e9672b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "services_quotes"`);
        await queryRunner.query(`DROP TABLE "quote"`);
    }

}
