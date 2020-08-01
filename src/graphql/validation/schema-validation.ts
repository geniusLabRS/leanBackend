import { merge } from 'lodash';

import userSchema from '../resources/user/user.validation';
import profileSchema from '../resources/profile/profile.validation';
import tokenSchema from '../resources/token/token.validation';
import templateSchema from '../resources/*Template/template.validation';
import interestSchema from '../resources/interest/template.validation';

export default async inputMethod => {

    var allSchema = await merge(
        tokenSchema,
        userSchema,
        profileSchema,
        templateSchema,
        interestSchema
    );

    return allSchema[inputMethod].schema
}