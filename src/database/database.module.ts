import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'postgres',
//   port: 5432,
// });

// client.connect();
//modulo global para que pueda ser importado en cualquier otro modulo
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configService.database.host,
          port: configService.database.port,
          username: configService.database.user,
          password: configService.database.password,
          database: configService.database.name,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],

  exports: [TypeOrmModule],
})
export class DatabaseModule {}
