/**
 * PartordersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */




const userCreditModel = sails.models.usercredit;
const express734 = require('express');
const app734 = express734();
const mysql734 = require('mysql')

const db734 = mysql734.createConnection(
    { host: 'ewallet.c4hqv6hsr2yl.us-east-1.rds.amazonaws.com', user: 'admin', password: 'Meeta321', port: '3306',
   database: 'e-wallet',ssl:true });
   
   //Connect
   db734.connect((err) => {
    if (err) {
        throw err;
 }
 else{
 console.log("Connection established.");
 sql="use `e-wallet`;";
 db734.query(sql,function(err,result)
 {
 if(err)
 throw err;
 console.log("Result:"+JSON.stringify(result));
}
);
}

console.log('MySql Connected');
});
module.exports = {
  
    getUserCredits: function (req566, res566) {
        sails.models.usercredit.find().exec(function (err566, succ566) {
            if (err566) {
                return res566.json(err566)
            }
            return res566.json(succ566);
        })
    },

    getCreditsByUserId: function (req566, res566) {
        let userid = req566.params.username;
        sails.models.usercredit.find({ username: userid}).exec(function (err566, succ566) {
            if (err566) {
                return res566.json(err566)
            }
            return res566.json(succ566);
        })
    },    

    postUserCredits: function (req566, res566) {
        let username = req566.body.username;
        let credits = parseInt( req566.body.credit,0);
        sails.models.usercredit.find({ username: username }).exec(function (err566, succ566) {
            if (err566) {
                return res566.json(err566)
            }
            else if (succ566.length > 0) {
                return res566.json("Username already exist");
            }
            else {
                sails.models.usercredit.create({ username:username, credit: credits}).exec(function (err, succ) {
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


    putUserCredits: function (req566, res566) {
       let username = req566.body.username;
       let credit = parseInt(req566.body.credit, 0);
       let action = req566.body.action;
       let txnId = req566.body.xid;

       console.log(req566.body);


    //    if(action==='start')
    //     {
    //         let query = 'XA START \'' + txnId.toString() +'\';' + 'update ewallet.usercredit set credit=' + credit+ ' where username = \'' + username + '\';' + 'XA END \'' + txnId +'\';'
    //         console.log(query);
    //         console.log('connected start with: ' + db734.threadId);
    //         db734.query(query, function (err566, succ566) {
    //             return res566.json("Success...");
    //         }
    //         )
    //     }



        if(action==='start')
        {
            console.log('connected start with: ' + db734.threadId);
            //XA START
            db734.query('XA START \'' + txnId.toString() +'\'', function (err566, succ566) {
            if (err566) {
                res566.status(400);
                return res566.json(err566)
            }

            //UPDATE
            userCreditModel.find({ username: username }).exec(function (err566, succ566) {
                if (err566) {
                    res566.status(400);
                    return res566.json(err566)
                }
                else if (succ566.length > 0) {
                    db734.query('update usercredit set credit=' + credit+ ' where username = \'' + username + '\'', function (err, succ566){
                        if (err) {
                            db734.query('XA END \'' + txnId +'\'', function (err566, res566) {
                                if (err566) {
                                    res566.status(400);
                                    return res566.json(err566)
                                }
                        })
                            res566.status(400);
                            return res566.json(err)
                        }
                        //XA END
                        db734.query('XA END \'' + txnId +'\'', function (err566, succ566) {
                            if (err566) {
                                res566.status(400);
                                return res566.json(err566)
                            }
                            return res566.json("successfully Initiated XA transaction for id: " + txnId);
                    })
                    })
                    // userCreditModel.update({ username: username }).set({ credit: credit }).exec(function (err, succ) {
                        
                    // })
                }
                else {
                    db734.query('XA END \'' + txnId +'\'', function (err566, succ566) {
                        if (err566) {
                            res566.status(400);
                            return res566.json(err566)
                        }
                    return res566.json("Username does not exists");
                })}
            })


        })
        }
        else if(action==='prepare')
        {
            sails.log('prepare');
            console.log('connected prepare with: ' + db734.threadId);
            db734.query('XA PREPARE \'' + txnId +'\';', function (err566, succ566) {
                if (err566) {
                    res566.status(400);
                    return res566.json(err566)
                }
                return res566.json("successfully prepared XA transaction with id: " + txnId);
            })
        }
        else if(action==='commit')
        {
            sails.log('commit');
            db734.query('XA COMMIT \'' + txnId +'\';', function (err566, succ566) {
                if (err566) {
                    res566.status(400);
                    return res566.json(err566)
                }
                return res566.json("successfully COMMITTED XA transaction with id: " + txnId);
            })
        }
        else if(action==='rollback')
        {
            sails.log('rollback');
            db734.query('XA ROLLBACK \'' + txnId +'\';', function (err566, succ566) {
                if (err566) {
                    res566.status(400);
                    return res566.json(err566)
                }
                return res566.json("successfully ROLLBACKED XA transaction with id: " + txnId);
            })
        }      
   },

   putUser: function (req566, res566) {
    let username = req566.body.username;
    console.log(req566);
    console.log(req566.body);
    console.log(username);
    let credit = parseInt(req566.body.credit, 0);
    
   
        sails.models.usercredit.find({ username: username }).exec(function (err566, succ566) {
            if (err566) {
                return res566.json(err566)
            }
            else if (succ566.length > 0) {
                sails.models.usercredit.update({ username: username }).set({ credit: credit }).exec(function (err, succ) {
                    if (err) {
                        return res566.json(err)
                    }
                    else {
                        res566.redirect("/getUsers");
                    }
                })
            }
            else {
                return res566.json("Username does not exists");
            }
        })
   
},

addUser: function (req566, res566) {
    let username = req566.body.username;
    let credits = parseInt( req566.body.credit,0);
    sails.models.usercredit.find({ username: username }).exec(function (err566, succ566) {
        if (err566) {
            return res566.json(err566)
        }
        else if (succ566.length > 0) {
            return res566.json("Username Credit details already exist");
        }
        else {
            sails.models.usercredit.create({ username:username, credit: credits}).exec(function (err, succ) {
                if (err) {
                    return res566.json(err)
                }
                else {
                    res566.redirect("/getUsers");
                }
            })
        }
    })
},
    
   getUsers: function (req566, res566) {
    sails.models.usercredit.find().exec(function (err566, succ566) {
        if (err566) {
            return res566.json(err566)
        }
        // return res566.json(succ566);
        res566.view('pages/updateUsers', {usercredit:succ566})
    })
    },


    // postPartorders: function (req566, res566) {
    //     let id = req566.body.partId;
    //     let userId = req566.body.userId;
    //     let jobName = req566.body.jobName;
    //     let qty = parseInt(req566.body.qty, 0);
    //     sails.log(id, userId, jobName,qty)
    //     Partordersy.create({ id, userId, jobName,qty }).exec(function (err, succ) {
    //         if (err) {
    //             return res566.json(err)
    //         }
    //         else {
    //             return res566.json("successfully inserted..");
    //         }
    //     })
    // },


    // getPartordersView: function (req566, res566) {
    //     let options = '';
    //     Partordersy.query('SELECT distinct jobName FROM `Project-G14`.partordersy', function (err566, succ566) {
    //         if (err566) {
    //             return res566.json(err566)
    //         }
    //         //return res566.json(succ566);
    //         options = succ566['rows'];
    //         sails.log(options)
    //     })

    //     Partordersy.find().sort([{ jobName: 'ASC' },{ userId: 'ASC' },{ qty: 'ASC' }]).exec(function (err566, succ566) {
    //         if (err566) {
    //             return res566.json(err566)
    //         }
    //         //return res566.json(succ566);
    //         res566.view('pages/partordersView', {parts:succ566,options:options})
    //     })
    // },

    // searchPartOrders: function (req566, res566) {
    //     let jobName = req566.body.jobName;
    //     sails.log(jobName)
    //     let options = '';

    //     Partordersy.query('SELECT distinct jobName FROM `Project-G14`.partordersy', function (err566, succ566) {
    //         if (err566) {
    //             return res566.json(err566)
    //         }
    //         //return res566.json(succ566);
    //         options = succ566['rows'];
    //         sails.log(options)
    //     })

    //     Partordersy.find({ jobName }).sort([{ jobName: 'ASC' },{ userId: 'ASC' },{ qty: 'ASC' }]).exec(function (err566, succ566) {
    //         if (err566) {
    //             return res566.json(err566)
    //         }
    //         //return res566.json(succ566);
    //         res566.view('pages/partordersView', {parts:succ566,options:options})
    //     })
    // },

};

