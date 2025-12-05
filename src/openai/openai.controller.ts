import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('prompt')
  async sendPrompt(@Body('prompt') prompt: string) {
    const response = await this.openAIService.generateText(prompt);
    return { response };
  }
}
