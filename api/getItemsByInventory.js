'user strict'

var AWS = require('aws-sdk'),
	documentClient = new AWS.DynamoDB.DocumentClient(); 
 
exports.getItemsByIventory = function(event, context, callback){
	var params = {
		TableName : process.env.TABLE_NAME,
		FilterExpression : '#inventory = :inventoryId',
		ExpressionAttributeValues : {':inventoryId' : event.inventory},
		ExpressionAttributeNames: { "#inventory": "inventory"}
	};
	documentClient.scan(params, function(err, data){
		if(err){
		    callback(err, null);
		}else{
		    callback(null, data.Items);
		}
	});
}
