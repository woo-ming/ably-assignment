import { MigrationInterface, QueryRunner } from 'typeorm';

export class TempFile1657034308638 implements MigrationInterface {
  name = 'TempFile1657034308638';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cellphone_verification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cellphone\` varchar(16) NOT NULL, \`verification_code\` varchar(6) NOT NULL, \`verified\` tinyint NOT NULL DEFAULT 0, \`verified_at\` timestamp NULL, \`expired_at\` timestamp NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`cellphone_verification\``);
  }
}
