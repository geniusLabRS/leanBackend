import * as jwt from 'jsonwebtoken';
import {
    app,
    db,
    chai,
    handleError,
    expect,
    destroyAll
} from '../../test-utils';
import { UserInstance } from '../../../src/models/UserModel';
import { JWT_SECRET } from '../../../src/utils/utils';
import { InterestInstance } from '../../../src/models/InterestModel';


describe('Interest - Fields Validations', () => {



    ///////////////////////////////////////////////////////////////////////
    //----------------------------- INIT  ------------------------------ //
    ///////////////////////////////////////////////////////////////////////
    //#region -- Initial Load --

    let userId: number;
    let token: string;

    let interestId: number;

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
            })
            .then(() => db.Interest.bulkCreate([
                {
                    label: 'interest test'
                }
            ], { returning: true }))
            .then((interest: InterestInstance[]) => {
                interestId = interest[0].get('id');
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

    //#region -- label --
    describe('label', () => {

        //#region -- Should return errors, trying to update the Interest sending empty Label --

        it('Should return errors, trying to update the Interest sending empty Label', () => {
            let body = {
                query: `
                        mutation updateExistingInterest($id: ID!, $input: InterestUpdateInput!) {
                            updateInterest(id: $id, input: $input) {
                                id
                                label
                            }
                        }
                    `,
                variables: {
                    input: {
                        label: ''
                    },
                    id: interestId
                }
            };


            return chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(JSON.stringify(body))
                .then(res => {
                    const errors = res.body.errors[0];
                    expect(res.body.data).to.be.null;
                    expect(res.body).to.have.keys(['data', 'errors']);
                    expect(errors.message).to.be.an('array');
                    expect(errors.message[0].fieldNameError).to.equal(`label`);
                    expect(errors.message[0].fieldMessageError).to.equal(`O campo interesse não pode estar vazio.`);
                    expect(errors.message[1].fieldNameError).to.equal(`label`);
                    expect(errors.message[1].fieldMessageError).to.equal(`O campo interesse não atinge o tamanho mínimo de 1 caracteres.`);
                }).catch(handleError);
        });

        //#endregion

        //#region -- Should return an error, trying to update the Interest sending long Label --

        it('Should return an error, trying to update the Interest sending long Label', () => {
            let body = {
                query: `
                        mutation updateExistingInterest($id: ID!, $input: InterestUpdateInput!) {
                            updateInterest(id: $id, input: $input) {
                                id
                                label
                            }
                        }
                    `,
                variables: {
                    input: {
                        label: 'Lorem ipsum at per adipiscing faucibus fringilla convallis sem dapibus, lacus suspendisse fusce per urna volutpat sagittis aliquam semper interdum, eget facilisis auctor consectetur egestas curabitur torquent auctor. proin luctus scelerisque lacus magna taciti eleifend faucibus mi augue dictum, mollis ultricies ligula scelerisque justo himenaeos amet inceptos faucibus, sit tempor mauris sapien lacus dolor posuere sagittis tortor. molestie nec eget turpis aliquam tempus eleifend volutpat pharetra sociosquewss'
                    },
                    id: interestId
                }
            };


            return chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(JSON.stringify(body))
                .then(res => {
                    const errors = res.body.errors[0];
                    expect(res.body.data).to.be.null;
                    expect(res.body).to.have.keys(['data', 'errors']);
                    expect(errors.message).to.be.an('array');
                    expect(errors.message[0].fieldNameError).to.equal(`label`);
                    expect(errors.message[0].fieldMessageError).to.equal(`O campo interesse excede o tamanho limite de 30 caracteres.`);
                }).catch(handleError);
        });

        //#endregion

        //#region -- Should return an error, trying to update Interest sending null Label --

        it('Should return an error, trying to update Interest sending null Label', () => {
            let body = {
                query: `
                        mutation updateExistingInterest($id: ID!, $input: InterestUpdateInput!) {
                            updateInterest(id: $id, input: $input) {
                                id
                                label
                            }
                        }
                    `,
                variables: {
                    input: {
                        label: null
                    },
                    id: interestId
                }
            };

            return chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(JSON.stringify(body))
                .then(res => {
                    const errors = res.body.errors;
                    console.log(res.body)
                    expect(res.body).to.have.keys(['errors']);
                    expect(errors).to.be.an('array');
                    expect(errors[0].message).to.contains(`Variable "$input" got invalid value`);
                }).catch(handleError);
        });

        //#endregion

    });
    //#endregion

    //#endregion
});