import { PrismaModule } from './core/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IS_DEV_ENV } from './shared/utils/is-dev.util';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { getGraphQLConfig } from './core/config/graphql.config';
import { RedisModule } from './core/redis/redis.module';

@Module({
	imports: [ConfigModule.forRoot(
		{	ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}
	),PrismaModule,
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			useFactory: getGraphQLConfig,
			imports: [ConfigModule],
			inject: [ConfigService]
		}),
		RedisModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
