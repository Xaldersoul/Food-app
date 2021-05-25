const { Diet, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Diet model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Diet.sync({ force: true }));
        describe('name', () => {
            it('should work when its created', () => {
                Diet.create({ name: 'Vegano' });
            });
        });
    });
});