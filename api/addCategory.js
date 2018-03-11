 
var AWS = require('aws-sdk'),
uuid = require('uuid'),
documentClient = new AWS.DynamoDB.DocumentClient(); 

exports.addCategories = function(event, context, callback){
var params = {
    Item : {
        "id" : uuid.v1(),
        "name" : event.name,
    },
    TableName : process.env.TABLE_NAME
};
documentClient.put(params, function(err, data){
    callback(err, data);
});
}