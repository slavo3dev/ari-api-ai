import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PorchService, Porch } from './porch.service';

@Controller('porch')
export class PorchController {
  constructor(private readonly porchService: PorchService) {}

  // ✅ CREATE
  @Post()
  async createPorch(@Body() porchData: Omit<Porch, 'created_at'>) {
    try {
      const data = await this.porchService.createPorch(porchData);
      return { message: 'Porch created successfully', data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // ✅ READ ALL
  @Get()
  async getAllPorchData(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 0;
    const limitNum = limit ? parseInt(limit, 10) : 100;
    try {
      const data = await this.porchService.getAllPorchData(pageNum, limitNum);
      return { count: data.length, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ✅ READ BY ID
  @Get(':id')
  async getPorchById(@Param('id') id: string) {
    try {
      const data = await this.porchService.getPorchById(id);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // ✅ UPDATE
  @Put(':id')
  async updatePorch(@Param('id') id: string, @Body() updates: Partial<Porch>) {
    try {
      const data = await this.porchService.updatePorch(id, updates);
      return { message: 'Porch updated successfully', data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // ✅ DELETE
  @Delete(':id')
  async deletePorch(@Param('id') id: string) {
    try {
      const result = await this.porchService.deletePorch(id);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id/like')
  async addLike(@Param('id') id: string, @Body('email') email: string) {
    const data = await this.porchService.addLike(id, email);
    return { message: `Liked post ${id}`, data };
  }

  @Patch(':id/unlike')
  async removeLike(@Param('id') id: string, @Body('email') email: string) {
    const data = await this.porchService.removeLike(id, email);
    return { message: `Removed like from post ${id}`, data };
  }
  // ✅ LEARNING DAYS COUNT
  @Get('user/count')
  async getUserLearningDays(@Query('email') email: string) {
    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const count = await this.porchService.countLearningDaysByEmail(email);
      return { email, learningDays: count };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to count learning days',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
