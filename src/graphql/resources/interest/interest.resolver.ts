import { GraphQLResolveInfo } from 'graphql';
import { Transaction } from 'sequelize';

import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { InterestInstance } from '../../../models/InterestModel';
import { compose } from '../../composable/composable.resolver';
import { authResolver } from '../../composable/auth.resolver';
import { verifyTokenResolver } from '../../composable/verify-token.resolver';
import { validationFieldsResolver } from '../../composable/validation-fields.resolver';
import { handleError, throwError } from '../../../utils/utils';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';


export const interestResolvers = {

    Query: {

        interest: compose(authResolver, verifyTokenResolver, validationFieldsResolver)((parent, args, context: ResolverContext, info) => {
            args.id = parseInt(args.id);
            return context.db.Interest
                .findById(args.id, {
                    attributes: context.requestedFields.getFields(info, { keep: ['id'] })
                })
                .then((interest: InterestInstance) => {
                    throwError(!interest, `Interest with id ${args.id} not found`);
                    return interest;
                }).catch(handleError);
        }),

        interests: compose(authResolver, verifyTokenResolver)((parent, { first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Interest
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, { keep: ['id'] })
                }).catch(handleError);
        }),

    },

    Mutation: {

        createInterest: compose(authResolver, verifyTokenResolver, validationFieldsResolver)((parent, args, context: ResolverContext, info) => {
            return context.db.sequelize.transaction((t: Transaction) => {
                return context.db.Interest
                    .create(args.input, { transaction: t });
            }).catch(handleError);
        }),

        updateInterest: compose(authResolver, verifyTokenResolver, validationFieldsResolver)((parent, args, context: ResolverContext, info) => {
            return context.db.sequelize.transaction((t: Transaction) => {
                return context.db.Interest
                    .findById(args.id)
                    .then((interest: InterestInstance) => {
                        throwError(!interest, `Interest with id ${args.id} not found`);
                        return interest.update(args.input, { transaction: t });
                    });
            })
            .catch(handleError);
        }),

        deleteInterest: compose(authResolver, verifyTokenResolver, validationFieldsResolver)((parent, args, context: ResolverContext, info) => {
            return context.db.sequelize.transaction((t: Transaction) => {
                return context.db.Interest
                    .findById(args.id)
                    .then((interest: InterestInstance) => {
                        throwError(!interest, `Interest with id ${args.id} not found`);
                        return interest.destroy({ transaction: t })
                            .then((interest: InterestInstance | any) => !!interest);
                    });
            }).catch(handleError);
        })
    }
};