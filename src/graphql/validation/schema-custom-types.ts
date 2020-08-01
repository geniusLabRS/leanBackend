import * as yup from 'yup';
import schemaMessagesInstance from '../validation/schema-messages';

class CustomTypes {
    static customTypesInstance: CustomTypes;

    constructor() {
        if (!CustomTypes.customTypesInstance) {
            CustomTypes.customTypesInstance = this;
        }
        return CustomTypes.customTypesInstance;
    }

    //#region -- Default --

    id = {
        validation: yup.string()
            .required(schemaMessagesInstance.defaulted.id.required)
            .min(1, schemaMessagesInstance.defaulted.id.min)
            .max(24, schemaMessagesInstance.defaulted.id.max)
    }
    email = {
        validation: yup.string()
            .required(schemaMessagesInstance.defaulted.email.required)
            .min(6, schemaMessagesInstance.defaulted.email.min)
            .max(64, schemaMessagesInstance.defaulted.email.max)
            .email(schemaMessagesInstance.defaulted.email.email)
    }
    username = {
        validation: yup.string()
            .required(schemaMessagesInstance.defaulted.username.required)
            .min(6, schemaMessagesInstance.defaulted.username.min)
            .max(32, schemaMessagesInstance.defaulted.username.max)
            .matches(/^[a-zA-Z0-9]*$/, schemaMessagesInstance.defaulted.username.alphanum)
    }
    password = {
        validation: yup.string()
            .required(schemaMessagesInstance.defaulted.password.required)
            .min(6, schemaMessagesInstance.defaulted.password.min)
            .max(12, schemaMessagesInstance.defaulted.password.max)
    }
    login = {
        validation: yup.string()
            .required(schemaMessagesInstance.defaulted.login.required)
            .min(6, schemaMessagesInstance.defaulted.login.min)
            .max(64, schemaMessagesInstance.defaulted.login.max)
    }

    //#endregion

    //#region -- Profile --

    profileName = {
        validation: yup.string()
            .nullable()
            .min(1, schemaMessagesInstance.profile.name.min)
            .max(64, schemaMessagesInstance.profile.name.max)
    }
    profileBiography = {
        validation: yup.string()
            .nullable()
            .min(1, schemaMessagesInstance.profile.biography.min)
            .max(30, schemaMessagesInstance.profile.biography.max)
    }

    //#endregion

    //#region -- Template --

    templateDescription = {
        validation: yup.string()
            .required(schemaMessagesInstance.template.description.required)
            .min(1, schemaMessagesInstance.template.description.min)
            .max(512, schemaMessagesInstance.template.description.max)
    }

    //#endregion

    //#region -- Interest --

    interestLabel = {
        validation: yup.string()
            .required(schemaMessagesInstance.interest.label.required)
            .min(1, schemaMessagesInstance.interest.label.min)
            .max(30, schemaMessagesInstance.interest.label.max)
    }

    //#endregion
}

const customTypesInstance: CustomTypes = new CustomTypes();
Object.freeze(customTypesInstance);
export default customTypesInstance;