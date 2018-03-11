'user strict'

var AWS = require('aws-sdk'),
	documentClient = new AWS.DynamoDB.DocumentClient(); 
 
exports.updateItems = function(event, context, callback){
	var params = {
	   Key:{
	       "id" : event.id
        },
		TableName : process.env.TABLE_NAME,
		UpdateExpression : 'set #quantity = :newQuantity, #exitDate = :newExitDate, #inventory = :newInventory',
		ConditionExpression : '#item = :itemId',
		ExpressionAttributeValues : {':newQuantity' : event.quantity, ':itemId' : event.id, ':newExitDate' : event.exitDate, ':newInventory' : event.inventory },
		ExpressionAttributeNames: { '#quantity': 'quantity', '#item' : 'id', "#exitDate" : 'exitDate', "#inventory" : 'inventory'}
	};
	documentClient.update(params, function(err, data){
		if(err){
		    callback(err, null);
		}else{
		    callback(null, data.Items);
		}
	});
}