import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class GetCatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const valid = value.match(/^[^.]*\.[^.]*[0-9]$/);
    if(!valid){
      throw new BadRequestException("Invalid category format")
    }
    return value.split(".")[1];
  }
}
