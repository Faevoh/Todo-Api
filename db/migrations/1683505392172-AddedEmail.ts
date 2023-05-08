import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEmail1683505392172 implements MigrationInterface {
    name = 'AddedEmail1683505392172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
    }

}
