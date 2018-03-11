'use strict';
 
var AWS = require('aws-sdk'),
	uuid = require('uuid'),
	documentClient = new AWS.DynamoDB.DocumentClient(); 
 
exports.addItems = function(event, context, callback){
	var params = {
		Item : {
			"id" : uuid.v1(),
			"name" : event.name,
			"entryDate" : event.entryDate,
			"exitDate" : event.exitDate,
			"expiryDate" : event.expiryDate,
			"quantity" : event.quantity,
			"inventory" : event.inventory,
			"category" : event.category
		},
		TableName : process.env.TABLE_NAME
	};
	documentClient.put(params, function(err, data){
		callback(err, data);
	});
}