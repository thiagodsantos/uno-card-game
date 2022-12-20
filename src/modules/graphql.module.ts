import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQL } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GRAPHQL_DEBUG, GRAPHQL_PLAYGROUND } from 'src/env-vars';

@Module({
  imports: [
    GraphQL.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: GRAPHQL_DEBUG,
      playground: GRAPHQL_PLAYGROUND
    }),
  ],
})
export class GraphQLModule {}
