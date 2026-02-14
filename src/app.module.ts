import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { PorchModule } from './porch/porch.module';
import { CommentsModule } from './comments/comments.module';
import { SourcesModule } from './sources/sources.module';
import { MailcollectionModule } from './mailcollection/mailcollection.module';

@Module({
  imports: [
    SupabaseModule,
    PorchModule,
    CommentsModule,
    SourcesModule,
    MailcollectionModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes env variables available everywhere
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
