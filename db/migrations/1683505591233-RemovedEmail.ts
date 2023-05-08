import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedEmail1683505591233 implements MigrationInterface {
    name = 'RemovedEmail1683505591233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
    }

}
