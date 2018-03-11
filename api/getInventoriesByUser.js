'user strict'

var AWS = require('aws-sdk'),
	documentClient = new AWS.DynamoDB.DocumentClient(); 
 
exports.getInventoriesByUser = function(event, context, callback){
	var params = {
		TableName : process.env.TABLE_NAME,
		FilterExpression : '#owner = :ownerId',
		ExpressionAttributeValues : {':ownerId' : event.owner},
		ExpressionAttributeNames: { "#owner": "owner"}
	};
	documentClient.scan(params, function(err, data){
		if(err){
		    callback(err, null);
		}else{
		    callback(null, data.Items);
		}
	});
}
