import bcrypt from 'bcrypt';
import NcryptJs from 'ncrypt-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoHelper {
  readonly saltRounds = 10;
  ncryptJs: NcryptJs;

  constructor(private configService: ConfigService) {
    this.ncryptJs = new NcryptJs(configService.get<string>('REFRESH_TOKEN_SECRET'));
  }

  hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }

  compare(data: string, encryptedData: string): Promise<boolean> {
    return bcrypt.compare(data, encryptedData);
  }

  encrypt(data: string): string {
    return this.ncryptJs.encrypt(data);
  }

  decrypt(data: string): string {
    return this.ncryptJs.decrypt(data);
  }
}
