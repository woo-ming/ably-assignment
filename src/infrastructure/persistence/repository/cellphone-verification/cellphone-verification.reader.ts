import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exception/exception';
import { EntityNotFoundExceptionMessage } from 'src/domain/user/exception/error-message';
import { DataSource, Repository } from 'typeorm';
import { CellphoneVerificationEntity } from '../../entity/cellphone-verification.entity';

@Injectable()
export class CellphoneVerificationReader {
  private readonly repository: Repository<CellphoneVerificationEntity>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(
      CellphoneVerificationEntity,
    );
  }

  async retrieveCellphoneVerificationByIdAndCellphone({
    id,
    cellphone,
  }: {
    id: number;
    cellphone: string;
  }): Promise<CellphoneVerificationEntity> {
    const cellphoneVerification = await this.repository.findOne({
      where: {
        id,
        cellphone,
      },
    });

    if (!cellphoneVerification)
      throw new EntityNotFoundException(
        EntityNotFoundExceptionMessage.CellphoneVerificationNotFoundMessage,
      );
    return cellphoneVerification;
  }
}
