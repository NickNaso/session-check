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
 * @description Check if the session is available otherwise it return an error
 * @param  {string | object} Error description or error object
 * @return {Function}
 * @version 1.0.0
 * @author Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 */
module.exports = function sessionCheck(error) {
  return function (req, res, next) {
    next = next || noop;
    if(!req.session) {
      console.log('poco');
      if(error && typeof error === 'string') {
        return next(new Error(error));
      } else if(error && typeof error === 'object') {
        return next(error);
      } else {
        return next(new Error("Session is not yet ready."));
      }
    }
    next();
  };
};

function noop() {}
