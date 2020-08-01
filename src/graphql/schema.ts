import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { Query } from './query';
import { Mutation } from './mutation';

import { profileTypes } from './resources/profile/profile.schema';
import { tokenTypes } from './resources/token/token.schema';
import { userTypes } from './resources/user/user.schema';
import { templateTypes } from './resources/*Template/template.schema';
import { interestTypes } from './resources/interest/interest.schema';

import { profileResolvers } from './resources/profile/profile.resolver';
import { tokenResolvers } from './resources/token/token.resolver';
import { userResolvers } from './resources/user/user.resolver';
import { templateResolvers } from './resources/*Template/template.resolver';
import { interestResolvers } from './resources/interest/interest.resolver';

const resolvers = merge(
    interestResolvers,
    profileResolvers,
    templateResolvers,
    tokenResolvers,
    userResolvers,
);

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        interestTypes,
        profileTypes,
        templateTypes,
        tokenTypes,
        userTypes
    ],
    resolvers
})






