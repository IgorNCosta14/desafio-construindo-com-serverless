import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

interface ITodo {
  id : string;
  user_id: string ;
	title: string;
	done: boolean ;
	deadline: Date;
}

export const handler : APIGatewayProxyHandler  = async (event) => { 

  const { id : user_id} = event.pathParameters;

  const response = await document.scan({
      TableName: 'users_todos',
      FilterExpression: 'user_id = :user_id',
      ExpressionAttributeValues: {
          ':user_id': user_id
      }
      }).promise();

  var todos = response.Items as ITodo[] ;

  if(todos){
      return {
          statusCode : 201,
          body  : JSON.stringify({
              status : "Success",
              _count : todos.length,
              todos
          })
        }
  }

  return {
      statusCode : 201,
      body  : JSON.stringify({
          message : "User does not exist!",
      })
    }

 }