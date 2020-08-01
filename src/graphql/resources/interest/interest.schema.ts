const interestTypes = `
    type Interest {
        id: ID!
        label: String!
        createdAt: String!
        updatedAt: String!
    }

    input InterestCreateInput {
        label: String!
    }

    input InterestUpdateInput {
        label: String!
    }
`;

const interestQueries = `
    interest(id: ID!): Interest
    interests(first: Int, offset: Int): [Interest!]!
`;

const interestMutations = `
    createInterest(input: InterestCreateInput!): Interest!
    updateInterest(id: ID!, input: InterestUpdateInput!): Interest!
    deleteInterest(id: ID!): Boolean
`;

export {
    interestTypes,
    interestQueries,
    interestMutations
}