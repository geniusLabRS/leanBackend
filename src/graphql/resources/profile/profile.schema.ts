const profileTypes = `
    type Profile {
        id: ID!
        name: String!
        biography: String
        createdAt: String!
        updatedAt: String!
        fk_user: User!
    }

    input ProfileUpdateInput {
        name: String!
        biography: String!
    }
`;

const profileQueries = `
    currentProfile: Profile
`;

const profileMutations = `
    updateCurrentProfile(input: ProfileUpdateInput!): Profile
`;

export {
    profileTypes,
    profileQueries,
    profileMutations
}