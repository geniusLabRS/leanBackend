import * as jwt from 'jsonwebtoken';
import {
    app,
    db,
    chai,
    handleError,
    expect,
    destroyAll
} from '../../../test/test-utils';
import { UserInstance } from '../../../src/models/UserModel';
import { JWT_SECRET } from '../../../src/utils/utils';


describe('Profile - Fields Validations', () => {



    ///////////////////////////////////////////////////////////////////////
    //----------------------------- INIT  ------------------------------ //
    ///////////////////////////////////////////////////////////////////////
    //#region -- Initial Load --

    let userId: number;
    let token: string;

    beforeEach(async () => {
        return await db.User.bulkCreate([
            {
                username: "user test1",
                email: 'teste1@email.com',
                password: '123456'
            }
        ], { returning: true })
            .then((user: UserInstance[]) => {
                userId = user[0].get('id');
                const payload = { sub: userId };
                token = jwt.sign(payload, JWT_SECRET);
            });
    });

    afterEach(async () => {
        await destroyAll();
    });

    //#endregion



    ///////////////////////////////////////////////////////////////////////
    //-------------------------- VALIDATIONS  -------------------------- //
    ///////////////////////////////////////////////////////////////////////
    //#region -- Validations --

    //#region -- name --
    describe('name', () => {

        //#region -- Should return errors, tryng to update Profile with empty Name --

        it('Should return errors, tryng to update Profile with empty Name', () => {

            let body = {
                query: `
                    mutation updateExistingProfile($input: ProfileUpdateInput!) {
                        updateCurrentProfile(input: $input) {
                            name
                        }
                    }
                `,
                variables: {
                    input: {
                        name: '',
                    }
                }
            };

            return chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(JSON.stringify(body))
                .then(res => {
                    const errors = res.body.errors[0];
                    expect(res.body).to.have.keys(['data', 'errors']);
                    expect(res.body.data).to.be.key('updateCurrentProfile');
                    expect(res.body.data.updateCurrentProfile).to.be.null;
                    expect(res.body.errors).to.be.an('array').with.length(1);
                    expect(errors.message[0].fieldNameError).to.be.equal('name');
                    expect(errors.message[0].fieldMessageError).to.be.equal('O campo nome não atinge o tamanho mínimo de 1 caracteres.');
                }).catch(handleError);
        });

        //#endregion

        //#region -- Should return an error, tryng to update Profile with long Name --

        it('Should return an error, tryng to update Profile with long name', () => {
            let body = {
                query: `
                    mutation updateExistingProfile($input: ProfileUpdateInput!) {
                        updateCurrentProfile(input: $input) {
                            name
                        }
                    }
                `,
                variables: {
                    input: {
                        name: 'namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename',
                    }
                }
            };

            return chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(JSON.stringify(body))
                .then(res => {
                    const errors = res.body.errors[0];
                    expect(res.body).to.have.keys(['data', 'errors']);
                    expect(res.body.data).to.be.key('updateCurrentProfile');
                    expect(res.body.data.updateCurrentProfile).to.be.null;
                    expect(res.body.errors).to.be.an('array').with.length(1);
                    expect(errors.message[0].fieldNameError).to.be.equal('name');
                    expect(errors.message[0].fieldMessageError).to.be.equal('O campo nome excede o tamanho limite de 64 caracteres.');
                }).catch(handleError);
        });

        //#endregion

    });
    //#endregion

    //#region -- name --
    describe('name', () => {

        //#region -- Should return errors, tryng to update Profile with empty Biography --

        it('Should return errors, tryng to update Profile with empty Biography', () => {

            let body = {
                query: `
                    mutation updateExistingProfile($input: ProfileUpdateInput!) {
                        updateCurrentProfile(input: $input) {
                            biography
                        }
                    }
                `,
                variables: {
                    input: {
                        biography: '',
                    }
                }
            };

            return chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(JSON.stringify(body))
                .then(res => {
                    const errors = res.body.errors[0];
                    expect(res.body).to.have.keys(['data', 'errors']);
                    expect(res.body.data).to.be.key('updateCurrentProfile');
                    expect(res.body.data.updateCurrentProfile).to.be.null;
                    expect(res.body.errors).to.be.an('array').with.length(1);
                    expect(errors.message[0].fieldNameError).to.be.equal('biography');
                    expect(errors.message[0].fieldMessageError).to.be.equal('O campo biografia não atinge o tamanho mínimo de 1 caracteres.');
                }).catch(handleError);
        });

        //#endregion

        //#region -- Should return an error, tryng to update Profile with long Biography --

        it('Should return an error, tryng to update Profile with long name', () => {
            let body = {
                query: `
                    mutation updateExistingProfile($input: ProfileUpdateInput!) {
                        updateCurrentProfile(input: $input) {
                            biography
                        }
                    }
                `,
                variables: {
                    input: {
                        biography: 'biographybiographybiographybiographybiographybiographybiographybiographybiography',
                    }
                }
            };

            return chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(JSON.stringify(body))
                .then(res => {
                    const errors = res.body.errors[0];
                    expect(res.body).to.have.keys(['data', 'errors']);
                    expect(res.body.data).to.be.key('updateCurrentProfile');
                    expect(res.body.data.updateCurrentProfile).to.be.null;
                    expect(res.body.errors).to.be.an('array').with.length(1);
                    expect(errors.message[0].fieldNameError).to.be.equal('biography');
                    expect(errors.message[0].fieldMessageError).to.be.equal('O campo biografia excede o tamanho limite de 30 caracteres.');
                }).catch(handleError);
        });

        //#endregion

    });
    //#endregion

    //#endregion
});