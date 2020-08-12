import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptoHelper } from './helpers/crypto.helper';

@Module({
  imports: [ConfigModule],
  providers: [CryptoHelper],
  exports: [CryptoHelper]
})
export class SharedModule {}
