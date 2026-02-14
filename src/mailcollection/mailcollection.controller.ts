import { Body, Controller, Post } from '@nestjs/common';
import { MailcollectionService } from './mailcollection.service';
import { CreateMailcollectionDto } from './dto/create-mailcollection.dto';

@Controller('mailcollection')
export class MailcollectionController {
  constructor(private mailcollectionService: MailcollectionService) {}

  @Post()
  async create(@Body() body: CreateMailcollectionDto) {
    const row = await this.mailcollectionService.create(body);
    return { ok: true, row };
  }
}
