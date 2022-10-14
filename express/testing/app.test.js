'use strict'

const { test } = require('tap');
const build = require('./app');

const models = require("../testing/test.database");
const user = models.user;

test('Test for LAN', async t => {
    const app = build();

    const response = await app.inject({
    method: 'GET',
    url: '/'
    });

    const responseBody = JSON.parse(response.body);
    console.log("Here is the result: ", responseBody);
    
    // TEST IF GETTING ALL USERS ARE WORKING
    t.equal(200, response.statusCode, 'returns a status code of 200');  

    // TEST IF USER DATA CAN BE RETRIEVED FROM USERNAME
    t.equal('A', responseBody.oneUser[0].first_name, "returns the details of username: a@a.a from database.");

    // TEST IF GETTING ALL USERS ARE WORKING
    t.equal("A", responseBody.allUsers[0].first_name, "returns the first name of the one of the users.");

    // TEST UPDATE FIRST NAME
    t.equal("CHANGED FNAME", responseBody.updateFirstName[0].first_name, "returns the updated first name");

    // TEST UPDATE LAST NAME
    t.equal("CHANGED LNAME", responseBody.updateLastName[0].last_name, "returns the updated last name");

    // TEST CREATE DUPLICATED
    t.equal(null, responseBody.createDuplicatedPKUser, "returns null because there's duplicate username");

    // TEST IF POSTS CAN BE RETRIEVED AND USER DETAILS ARE JOINED WITH THE RESULTS
    t.equal("A", responseBody.postsByUser[0]['user.first_name'], "returns the first name of post posted by username a@a.a");
});