import { profileMutations } from './resources/profile/profile.schema';
import { templatetMutations } from './resources/*Template/template.schema';
import { tokenMutations } from './resources/token/token.schema';
import { userMutations } from './resources/user/user.schema';
import { interestMutations } from './resources/interest/interest.schema';

const Mutation = `
    type Mutation {
        ${interestMutations}
        ${profileMutations}
        ${templatetMutations}
        ${tokenMutations}
        ${userMutations}
    }
`;

export {
    Mutation
}