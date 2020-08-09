module.exports = {  
    attributes: {
      id: {
        type: 'number',
        columnName: 'id',
        autoIncrement: true
      },
      username: {
        type: 'string'
      },
      credit: {
        type: 'number'
      }
    },
    customToJSON: function() {
      return _.omit(this, ['id'])
  }
  };