/**
 * PartsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const usertransactions = require("../models/usertransactions");

module.exports = {

    getTransactions: function (req566, res566) {
        sails.models.usertransactions.find().exec(function (err566, succ566) {
            if (err566) {
                return res566.json(err566)
            }
            return res566.json(succ566);
        })
    },

     getTransactionsByUserId: function (req566, res566) {
         let userid = req566.params.username;
         sails.log(userid)
         sails.models.usertransactions.find({ username: userid}).exec(function (err566, succ566) {
             if (err566) {
                 return res566.json(err566)
             }
             return res566.json(succ566);
         })
     },

    
     postTransactions: function (req566, res566) {
         let username = req566.body.username;
         let amount = parseInt( req566.body.transactionamount,0);
         let txnIdd = req566.body.xid;
         let date = req566.body.transactiondate;
         sails.models.usertransactions.find({ txnId: txnIdd }).exec(function (err566, succ566) {
             if (err566) {
                 return res566.json(err566)
             }
             else if (succ566.length > 0) {
                 return res566.json("transaction already exists");
             }
             else {
                 sails.models.usertransactions.create({ username:username, transactionamount: amount,
                     txnId: txnIdd, transactiondate:date}).exec(function (err, succ) {
                     if (err) {
                         return res566.json(err)
                     }
                     else {
                         return res566.json("successfully inserted..");
                     }
                 })
             }
         })
     },


    // //view data
    getTransactionsview: function (req566, res566) {
        let options = '';
        sails.models.usertransactions.query('SELECT distinct username FROM ewallet.usertransactions', function (err566, succ566) {
            if (err566) {
                return res566.json(err566)
            }
            //return res566.json(succ566);
            options = succ566['rows'];
            sails.log(options)
        })

        sails.models.usertransactions.find().exec(function (err566, succ566) {
            if (err566) {
                return res566.json(err566)
            }
            // return res566.json(succ566);
            res566.view("pages/viewtransactions", {usertransactions:succ566,options:options})
        })
    },

    searchTransactions: function (req566, res566) {
        let userName = req566.body.username;
        sails.log(userName)
        let options = '';

        sails.models.usertransactions.query('SELECT distinct username FROM ewallet.usertransactions', function (err566, succ566) {
            if (err566) {
                return res566.json(err566)
            }
            //return res566.json(succ566);
            options = succ566['rows'];
            sails.log(options)
        })

        sails.models.usertransactions.find({ username: userName }).sort([{ username: 'ASC' },{ transactionamount: 'ASC' },{ transactiondate: 'ASC' }]).exec(function (err566, succ566) {
            if (err566) {
                return res566.json(err566)
            }
            //return res566.json(succ566);
            res566.view('pages/viewtransactions', {usertransactions:succ566,options:options})
        })
    },

};

