import * as chai from 'chai';
const chaiHttp = require('chai-http');

import app from './../src/app';
import db from './../src/models';

chai.use(chaiHttp);
const expect = chai.expect;

const handleError = error => {
    const message: string = (error.response) ? error.response.res.text : error.message || error;
    return Promise.reject(`${error.name}: ${message}`);
};

const destroyAll = () => {
    return db.Template.destroy({ where: {} })
        .then(() => db.Interest.destroy({ where: {} }))
        .then(() => db.Profile.destroy({ where: {} }))
        .then(() => db.User.destroy({ where: {} }))
}

export {
    app,
    db,
    chai,
    expect,
    handleError,
    destroyAll
}