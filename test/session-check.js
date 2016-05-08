/******************************************************************************
 * Copyright (c) 2016 Nicola Del Gobbo
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 * WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing permissions
 * and limitations under the License.
 *
 * Contributors - initial API implementation:
 * Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 *****************************************************************************/

'use strict';

/** 
 * Module dependencies 
 */
var express = require('express');
var request = require('supertest');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionCheck = require('../');

//Test suite for session-check middleware
describe("Test session-check() middleware", function () {
  //Check if the module is appropriately exported
  it("Should export function", function () {
    expect(typeof sessionCheck).toEqual('function');
  });
  //If the session i setted this middleware should do nothing
  it("Should do nothing if req.session exist", function (done) {
    var app = express()
      .use(cookieParser())
      .use(session({
        secret: "@NickNaso",
        cookie: { maxAge: 60 * 1000 },
        name: "SessionCheck.SID",
        resave: true,
        saveUninitialized: false
      }))
      .use(sessionCheck())
      .get("/", function (req, res) {
        res.send("Session check");
      });
    request(app)
      .get("/")
      .expect(200, done);
  });
});
