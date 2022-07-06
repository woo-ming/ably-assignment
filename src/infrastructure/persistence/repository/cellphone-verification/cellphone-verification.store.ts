import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CellphoneVerificationEntity } from '../../entity/cellphone-verification.entity';

export interface CellPhoneVerificationStore {
  store(
    entity: CellphoneVerificationEntity,
  ): Promise<CellphoneVerificationEntity>;
}

@Injectable()
export class CellphoneVerificationStoreImpl
  implements CellPhoneVerificationStore
{
  private readonly repository: Repository<CellphoneVerificationEntity>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(
      CellphoneVerificationEntity,
    );
  }

  async store(
    entity: CellphoneVerificationEntity,
  ): Promise<CellphoneVerificationEntity> {
    return await this.repository.save(entity);
  }
}
