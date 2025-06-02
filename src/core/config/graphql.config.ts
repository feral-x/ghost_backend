import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { isDev } from '../../shared/utils/is-dev.util';
import * as process from 'node:process';
import { join } from 'node:path';

export function getGraphQLConfig(configService: ConfigService):ApolloDriverConfig {
	return {
		playground: isDev(configService),
		path: '/graphql',
		autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
		sortSchema: true,
		context: ({ req, res }) => ({ req, res })
	}
}