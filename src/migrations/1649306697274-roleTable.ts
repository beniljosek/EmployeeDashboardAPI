import {MigrationInterface, QueryRunner} from "typeorm";

export class roleTable1649306697274 implements MigrationInterface {
    name = 'roleTable1649306697274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Role" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "rid" SERIAL NOT NULL, "rname" character varying NOT NULL, CONSTRAINT "PK_97c9d7351e9ec057756d88ab3e3" PRIMARY KEY ("rid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Role"`);
    }

}
