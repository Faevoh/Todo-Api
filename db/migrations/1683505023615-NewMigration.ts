import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1683505023615 implements MigrationInterface {
    name = 'NewMigration1683505023615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`userName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_4583be7753873b4ead956f040e3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_4583be7753873b4ead956f040e3\``);
        await queryRunner.query(`DROP TABLE \`todos\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
