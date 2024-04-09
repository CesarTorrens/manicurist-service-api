import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import * as Joi from 'joi';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

import { environments } from './environments';
import { CategoriesModule } from './categories/categories.module';
import { QuotesModule } from './quotes/quotes.module';
import { ServicesquotesModule } from './servicesquotes/servicesquotes.module';
import { SeedsService } from './seeds/services/seed.service';
import { SeedsModule } from './seeds/seeds.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    UsersModule,
    DatabaseModule,
    CategoriesModule,
    QuotesModule,
    ServicesquotesModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedsService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedsService: SeedsService) {}
  async onModuleInit() {
    const data = await this.seedsService.seed();
  }
}
