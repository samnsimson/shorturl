import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { GetShortUrlBody, ResponseObject } from './entity/entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config('shorturl-db', true, false, '/'));
  }

  getHello(): string {
    return 'Hello World!';
  }

  generateUUID(): string {
    return uuidv4();
  }

  generateShortId(): string {
    return this.generateUUID().slice(0, 8);
  }

  async saveData(data: ResponseObject): Promise<ResponseObject> {
    return new Promise((resolve, reject) => {
      try {
        this.db.push('/data[]', data, true);
        resolve(data);
      } catch (error) {
        console.log(error);
        reject({});
      }
    });
  }

  async getShortUrl(body: GetShortUrlBody): Promise<any> {
    const domain = 'http://localhost:3000/';
    const shortID = this.generateShortId();
    const shortURL = domain + shortID;
    return await this.saveData({
      id: this.generateUUID(),
      long_url: body.url,
      shortID: shortID,
      short_url: shortURL,
    });
  }

  async getLongUrl(shortID: string): Promise<string> {
    const data = await this.db.getData('/data');
    const target = data.find((x: any) => x.shortID === shortID);
    return target.long_url;
  }
}
