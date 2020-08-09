/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  "/": { view: "pages/jobsMain" },
  "/homepage":{view:"pages/homepage"},
  "GET /getTransactions": "TransactionsController.getTransactions",
  "GET /getTransactions/:username/": "TransactionsController.getTransactionsByUserId",
   "POST /transactions": "TransactionsController.postTransactions",
   "GET /getUserCredits": "UserCreditsController.getUserCredits",
   "GET /getUserCredits/:username/": "UserCreditsController.getCreditsByUserId",
   "POST /usercredits": "UserCreditsController.postUserCredits",
   "PUT /usercredits": "UserCreditsController.putUserCredits",
   "POST /updateUserView": "UserCreditsController.putUser",
  // "Delete /deleteParts": "Parts.deleteParts",
  // "GET /getPartIds": "Parts.getPartIds",

  // "Get /getPartsView566": "Parts.getPartsView566",
  // "GET /addjob": { view: "Pages/addjob" },
   "POST /addUser": "UserCreditsController.addUser",
  // "POST /deletePartsView566": "Parts.deletePartsView566",
   "GET /getUsers": "UserCreditsController.getUsers",
  // "POST /putPartsView566/": "Parts.putPartsView566",

  // "GET /getPartorders": "Partordersy.getPartorders",
  // "POST /postPartorders": "Partordersy.postPartorders",
  
   "GET /getTransactionsview": "TransactionsController.getTransactionsview",
   "POST /searchTransactions": "TransactionsController.searchTransactions",
  
};
