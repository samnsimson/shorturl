import { ApiProperty } from '@nestjs/swagger';

export class GetShortUrlBody {
  @ApiProperty({
    default: 'https://www.google.com',
  })
  url: string;
}

export class ResponseObject {
  @ApiProperty()
  id: string;

  @ApiProperty()
  long_url: string;

  @ApiProperty()
  shortID: string;

  @ApiProperty()
  short_url: string;
}
