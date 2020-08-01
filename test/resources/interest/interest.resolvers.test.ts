import * as jwt from 'jsonwebtoken';
import { app, db, chai, handleError, expect, destroyAll } from '../../test-utils';
import { InterestInstance } from '../../../src/models/InterestModel';
import { JWT_SECRET } from '../../../src/utils/utils';
import { UserInstance } from '../../../src/models/UserModel';

describe('Interest - Resolvers', () => {



    ///////////////////////////////////////////////////////////////////////
    //----------------------------- INIT  ------------------------------ //
    ///////////////////////////////////////////////////////////////////////
    //#region -- Initial Load --

    let userId: number;
    let token: string;

    let unauthorizedId: number;

    let interestId: number;
    const nonexistentInterestId: number = 123;

    beforeEach(async () => {
        return await db.User.bulkCreate([
            {
                username: "user test1",
                email: 'teste1@email.com',
                password: '12345'
            },
            {
                username: "user test2",
                email: 'teste2@email.com',
                password: '54321'
            }], { returning: true })
            .then((user: UserInstance[]) => {
                userId = user[0].get('id');
                const payload = { sub: userId };
                token = jwt.sign(payload, JWT_SECRET);

                unauthorizedId = user[1].get('id');
            })
            .then(() => db.Interest.bulkCreate([
                {
                    label: 'interest 1'
                },
                {
                    label: 'interest 2'
                },
                {
                    label: 'interest 3'
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
    //---------------------------- QUERIES  ---------------------------- //
    ///////////////////////////////////////////////////////////////////////
    //#region -- Queries --

    describe('Queries', () => {

        //#region -- interest --

        describe('interest', () => {

            //#region -- Should return a especific Interest by Id --

            it('Should return a especific Interest by Id', () => {
                let body = {
                    query: `
                        query findOneInterest ($id: ID!) {
                            interest (id: $id) {
                                id
                                label
                            }
                        }
                    `,
                    variables: {
                        id: interestId
                    }
                };

                return chai.request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${token}`)
                    .send(JSON.stringify(body))
                    .then(res => {
                        const singleInterest = res.body.data.interest;
                        expect(res.body.data).to.be.an('object');
                        expect(singleInterest).to.be.an('object');
                        expect(singleInterest).to.have.keys(['id', 'label']);
                        expect(parseInt(singleInterest.id)).to.be.a('number');
                        expect(singleInterest.label).to.equal('interest 1');
                        expect(singleInterest.createdAt).to.be.undefined;
                        expect(singleInterest.updatedAt).to.be.undefined;
                        expect(singleInterest.fk_user).to.be.undefined;
                        expect(res.body.errors).to.be.undefined;
                    }).catch(handleError);
            });

            //#endregion

            //#region -- Should return an error, trying get a Interest with a nonexistent Id --

            it('Should return an error, trying get a Interest with a nonexistent Id', () => {
                let body = {
                    query: `
                        query errorFindInterest ($id: ID!) {
                            interest (id: $id) {
                                id
                                label
                            }
                        }
                    `,
                    variables: {
                        id: nonexistentInterestId
                    }
                };

                return chai.request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${token}`)
                    .send(JSON.stringify(body))
                    .then(res => {
                        const errors = res.body.errors;
                        expect(res.body.data.interest).to.be.null;
                        expect(res.body).to.have.keys(['data', 'errors']);
                        expect(errors).to.be.an('array');
                        expect(errors[0].message).to.equal(`Error: Interest with id ${nonexistentInterestId} not found`);
                    }).catch(handleError);
            });

            //#endregion

        })

        //#endregion

        //#region -- interests --

        describe('interests', () => {

            //#region -- Should return an list whith all Interests --

            it('Should return an list whith all Interests', () => {
                let body = {
                    query: `
                        query {
                            interests {
                                id
                                label
                            }
                        }
                    `
                };

                return chai.request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${token}`)
                    .send(JSON.stringify(body))
                    .then(res => {
                        const listInterests = res.body.data.interests;
                        expect(res.body.data).to.be.an('object');
                        expect(listInterests).to.be.an('array');
                        expect(listInterests[0]).to.be.an('object');
                        expect(listInterests[0]).to.have.keys(['id', 'label']);
                        expect(parseInt(listInterests[0].id)).to.be.a('number');
                        expect(listInterests[0].label).to.equal('interest 1');
                        expect(listInterests[1].label).to.equal('interest 2');
                        expect(listInterests[0].createdAt).to.be.undefined;
                        expect(listInterests[0].updatedAt).to.be.undefined;
                        expect(res.body.errors).to.be.undefined;
                    });

            });

            //#endregion

        });

        //#endregion
    });

    //#endregion



    ///////////////////////////////////////////////////////////////////////
    //--------------------------- MUTATIONS  --------------------------- //
    ///////////////////////////////////////////////////////////////////////
    //#region  -- Mutations --

    describe('Mutations', () => {

        //#region -- createInterest --

        describe('createInterest', () => {

            //#region -- Should create a new Interest --

            it('Should create a new Interest', () => {

                let body = {
                    query: `
                        mutation createNewInterest ($input: InterestCreateInput!) {
                            createInterest(input: $input) {
                                id
                                label
                            }
                        }
                    `,
                    variables: {
                        input: {
                            label: "interest created",
                        }
                    }
                };

                return chai.request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${token}`)
                    .send(JSON.stringify(body))
                    .then(res => {
                        const createdInterest = res.body.data.createInterest;
                        expect(res.body.data).to.be.an('object');
                        expect(createdInterest).to.be.an('object');
                        expect(createdInterest).to.have.keys(['id', 'label']);
                        expect(parseInt(createdInterest.id)).to.be.a('number');
                        expect(createdInterest.label).to.equal('interest created');
                        expect(createdInterest.createdAt).to.be.undefined;
                        expect(createdInterest.updatedAt).to.be.undefined;
                        expect(res.body.errors).to.be.undefined;
                    }).catch(handleError);
            });

            //#endregion

        });

        //#endregion

        //#region -- updateInterest --

        describe('updateInterest', () => {

            //#region -- Should update an existing Interest --

            it('Should update an existing Interest', () => {

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
                            label: "interest updated"
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
                        const updatedInterest = res.body.data.updateInterest;
                        expect(updatedInterest).to.be.an('object');
                        expect(updatedInterest).to.have.keys(['id', 'label']);
                        expect(parseInt(updatedInterest.id)).to.be.a('number');
                        expect(updatedInterest.label).to.equal('interest updated');
                        expect(updatedInterest.createdAt).to.be.undefined;
                        expect(updatedInterest.updatedAt).to.be.undefined;
                        expect(res.body.errors).to.be.undefined;
                    }).catch(handleError);
            });

            //#endregion

            //#region -- Should return an error, trying update a Interest with a nonexistent Id --

            it('Should return an error, trying update a Interest with a nonexistent Id', () => {
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
                        id: nonexistentInterestId,
                        input: {
                            label: "interest not updated",
                        }
                    }
                };

                return chai.request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${token}`)
                    .send(JSON.stringify(body))
                    .then(res => {
                        const errors = res.body.errors;
                        expect(res.body.data).to.be.null;
                        expect(res.body).to.have.keys(['data', 'errors']);
                        expect(errors).to.be.an('array');
                        expect(errors[0].message).to.equal(`Error: Interest with id ${nonexistentInterestId} not found`);
                    }).catch(handleError);
            });

            //#endregion

        });

        //#endregion

        //#region -- deleteInterest --

        describe('deleteInterest', () => {

            //#region -- Should delete an existing Interest --

            it('Should delete an existing Interest', () => {

                let body = {
                    query: `

                    mutation deleteExistingInterest($id: ID!) {
                        deleteInterest(id: $id)
                    }
                    `,
                    variables: {
                        id: interestId
                    }
                };

                return chai.request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${token}`)
                    .send(JSON.stringify(body))
                    .then(res => {
                        expect(res.body.data.deleteInterest).to.be.true;
                        expect(res.body.errors).to.be.undefined;
                    }).catch(handleError);
            });

            //#endregion

            //#region -- Should return an error, trying delete a Interest with a nonexistent Id --

            it('Should return an error, trying delete a Interest with a nonexistent Id', () => {

                let body = {
                    query: `

                    mutation deleteExistingInterest($id: ID!) {
                        deleteInterest(id: $id)
                    }
                    `,
                    variables: {
                        id: nonexistentInterestId
                    }
                };

                return chai.request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${token}`)
                    .send(JSON.stringify(body))
                    .then(res => {
                        const errors = res.body.errors;
                        expect(res.body.data.deleteInterest).to.be.null;
                        expect(res.body).to.have.keys(['data', 'errors']);
                        expect(errors).to.be.an('array');
                        expect(errors[0].message).to.equal(`Error: Interest with id ${nonexistentInterestId} not found`);
                    }).catch(handleError);
            });

            //#endregion

        });

        //#endregion

    });

    //#endregion



});