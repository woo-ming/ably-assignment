import { Module, Provider } from '@nestjs/common';
import { CellphoneVerificationReaderImpl } from '../repository/cellphone-verification/cellphone-verification.reader';
import { CellphoneVerificationStoreImpl } from '../repository/cellphone-verification/cellphone-verification.store';

export class CellPhoneVerificationDITokens {
  static readonly CellPhoneVerificationReader = Symbol(
    'CellPhoneVerificationReader',
  );
  static readonly CellPhoneVerificationStore = Symbol(
    'CellPhoneVerificationStore',
  );
}

const persistenceProviders: Provider[] = [
  {
    provide: CellPhoneVerificationDITokens.CellPhoneVerificationReader,
    useClass: CellphoneVerificationReaderImpl,
  },
  {
    provide: CellPhoneVerificationDITokens.CellPhoneVerificationStore,
    useClass: CellphoneVerificationStoreImpl,
  },
];

@Module({
  providers: [...persistenceProviders],
  exports: [...persistenceProviders],
})
export class CellphoneVerificationPersistenceModule {}
