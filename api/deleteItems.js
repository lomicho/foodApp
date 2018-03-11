'user strict'

var AWS = require('aws-sdk'),
	documentClient = new AWS.DynamoDB.DocumentClient(); 
 
exports.deleteItems = function(event, context, callback){
	var params = {
	   Key:{
	       "id" : event.id
        },
		TableName : process.env.TABLE_NAME
	};
	documentClient.delete(params, function(err, data){
		if(err){
		    callback(err, null);
		}else{
		    callback(null, data.Items);
		}
	});
}