import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GetShortUrlBody, ResponseObject } from './entity/entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @Redirect('', 301)
  async getLongUrl(@Param('id') id: string): Promise<any> {
    return { url: await this.appService.getLongUrl(id) };
  }

  @Post('get-short-url')
  @ApiResponse({ type: ResponseObject })
  async getShortUrl(@Body() body: GetShortUrlBody): Promise<ResponseObject> {
    return await this.appService.getShortUrl(body);
  }
}
