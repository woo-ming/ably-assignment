import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1656939303096 implements MigrationInterface {
  name = 'InitMigration1656939303096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(32) NOT NULL COMMENT '이름', \`phone\` varchar(16) NOT NULL COMMENT '전화번호', \`email\` varchar(32) NOT NULL COMMENT '이메일', \`nickname\` varchar(32) NOT NULL COMMENT '별명', \`password\` varchar(256) NOT NULL COMMENT '비밀번호', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`user_uk_phone\` (\`phone\`), UNIQUE INDEX \`user_uk_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`user_uk_email\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`user_uk_phone\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
