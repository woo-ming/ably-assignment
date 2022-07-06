import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exception/exception';
import { EntityNotFoundExceptionMessage } from 'src/domain/user/exception/error-message';
import { DataSource, Repository } from 'typeorm';
import { CellphoneVerificationEntity } from '../../entity/cellphone-verification.entity';

export interface CellphoneVerificationReader {
  retrieveCellphoneVerificationById(criteria: {
    id: number;
  }): Promise<CellphoneVerificationEntity>;
}

@Injectable()
export class CellphoneVerificationReaderImpl
  implements CellphoneVerificationReader
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

  async retrieveCellphoneVerificationById({
    id,
  }: {
    id: number;
  }): Promise<CellphoneVerificationEntity> {
    const cellphoneVerification = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!cellphoneVerification)
      throw new EntityNotFoundException(
        EntityNotFoundExceptionMessage.CellphoneVerificationNotFoundMessage,
      );
    return cellphoneVerification;
  }
}
