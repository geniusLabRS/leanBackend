import { profileQueries } from './resources/profile/profile.schema';
import { templateQueries } from './resources/*Template/template.schema';
import { userQueries } from './resources/user/user.schema';
import { interestQueries } from './resources/interest/interest.schema';

const Query = `
    type Query {
        ${interestQueries}
        ${profileQueries}
        ${templateQueries}
        ${userQueries}
    }
`;

export {
    Query
}