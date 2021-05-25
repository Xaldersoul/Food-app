const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { conn } = require('../../src/db.js');

const agent = session(app);

describe('Recipe routes', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('GET /types', () => {
        it('should get 200', () =>
            agent.get('/types').expect(200)
        );
        it("Diets have a length of 10", () => {
            agent.get("/types").then(el => {
                expect(el).to.have.lengthOf(10)
            })
        })
    });
});
