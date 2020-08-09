module.exports = {  
    attributes: {
      id: {
        type: 'number',
        columnName: 'id',
        autoIncrement:true
      },
      username: {
        type: 'string'
      },
      transactionamount: {
        type: 'number'
      },
      transactiondate: {
        type: 'string'
      },
      txnId: {
        type: 'string'
      }
    },
      customToJSON: function() {
        return _.omit(this, ['id'])
    }
  };