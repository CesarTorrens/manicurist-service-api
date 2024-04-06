import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationCategoriesAndServices1712433641632 implements MigrationInterface {
    name = 'RelationCategoriesAndServices1712433641632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_quotes" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "services_quotes" ADD CONSTRAINT "FK_aa41cbb68c472533f4575f73a84" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_quotes" DROP CONSTRAINT "FK_aa41cbb68c472533f4575f73a84"`);
        await queryRunner.query(`ALTER TABLE "services_quotes" DROP COLUMN "categoryId"`);
    }

}
