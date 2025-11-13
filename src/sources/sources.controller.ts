import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { SourcesService, Source } from './sources.service';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  // ✅ CREATE
  @Post()
  async createSource(@Body() body: Omit<Source, 'id' | 'created_at'>) {
    return this.sourcesService.createSource(body);
  }

  // ✅ READ ALL
  @Get()
  async getAllSources() {
    return this.sourcesService.getAllSources();
  }

  // ✅ READ BY ID
  @Get(':id')
  async getSourceById(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) throw new NotFoundException('Invalid ID');
    return this.sourcesService.getSourceById(parsedId);
  }

  // ✅ UPDATE
  @Patch(':id')
  async updateSource(
    @Param('id') id: string,
    @Body() updates: Partial<Source>,
  ) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) throw new NotFoundException('Invalid ID');
    return this.sourcesService.updateSource(parsedId, updates);
  }

  // ✅ DELETE
  @Delete(':id')
  async deleteSource(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) throw new NotFoundException('Invalid ID');
    return this.sourcesService.deleteSource(parsedId);
  }

  // ✅ ADD LIKE
  @Patch(':id/like')
  async addLike(@Param('id') id: string, @Body('email') email: string) {
    const parsedId = parseInt(id, 10);
    if (!email) throw new NotFoundException('Email required');
    return this.sourcesService.addLike(parsedId, email);
  }

  // ✅ REMOVE LIKE
  @Patch(':id/unlike')
  async removeLike(@Param('id') id: string, @Body('email') email: string) {
    const parsedId = parseInt(id, 10);
    if (!email) throw new NotFoundException('Email required');
    return this.sourcesService.removeLike(parsedId, email);
  }
}
