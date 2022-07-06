import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCellphoneVerification1657114366734
  implements MigrationInterface
{
  name = 'AlterCellphoneVerification1657114366734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cellphone_verification\` ADD \`expired\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cellphone_verification\` DROP COLUMN \`expired\``,
    );
  }
}
