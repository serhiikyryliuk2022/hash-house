import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable()
export class StorageService {
  static KEYS = {
    FOOTER: "FOOTER"
  }

  private static readonly KEY = CryptoJS.enc.Hex.parse('k8K06fY9DcymbWzkyx04sxsq01CRSdyS');
  private static readonly IV = CryptoJS.enc.Hex.parse('KrXwfe2TA2xijcmOXTERYd==');

  set(key: string, value: string | object) {
    localStorage.setItem(this.encrypt(key), typeof (value) === 'string'
      ? this.encrypt(value)
      : this.encrypt(JSON.stringify(value)));
  }

  get<T>(key: string): T | null {
    const data = localStorage.getItem(this.encrypt(key));

    if (data) return JSON.parse(this.decrypt(data));

    return null;
  }

  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, StorageService.KEY, { iv: StorageService.IV }).toString();
  }

  private decrypt(textToDecrypt: string): string {
    return CryptoJS.AES.decrypt(textToDecrypt, StorageService.KEY, { iv: StorageService.IV }).toString(CryptoJS.enc.Utf8);
  }
}
