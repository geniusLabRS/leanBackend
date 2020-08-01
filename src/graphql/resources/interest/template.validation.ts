import * as yup from 'yup';

import customTypesInstance from '../../validation/schema-custom-types'

export default {
    interest: {
        schema: yup.object({
            id: customTypesInstance.id.validation
        })
    },
    createInterest: {
        schema: yup.object({
            input: yup.object({
                label: customTypesInstance.interestLabel.validation
            })
        })
    },
    updateInterest: {
        schema: yup.object({
            id: customTypesInstance.id.validation,
            input: yup.object({
                label: customTypesInstance.interestLabel.validation
            })
        })
    },
    deleteInterest: {
        schema: yup.object({
            id: customTypesInstance.id.validation
        })
    },
}