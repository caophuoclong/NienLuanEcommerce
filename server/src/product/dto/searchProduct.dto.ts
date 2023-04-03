import { ApiProperty } from '@nestjs/swagger';
export class SearchProductDTO {
  @ApiProperty()
  lang: string;
  @ApiProperty()
  name: string;
}
