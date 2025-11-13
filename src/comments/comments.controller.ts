import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CommentsService, Comment } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async addComment(@Body() comment: Comment) {
    return this.commentsService.addComment(comment);
  }

  @Get(':porchId')
  async getCommentsByPorchId(@Param('porchId') porchId: string) {
    return this.commentsService.getCommentsByPorchId(porchId);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
