import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";
import { v4 as uuidV4 }  from "uuid";

interface ICreateTodo{
  user_id: string ;
	title: string;
	done: boolean ;
	deadline: Date;
}

export const handler : APIGatewayProxyHandler  = async (event) => { 
  const { id : user_id } = event.pathParameters;
  const { title , deadline } = JSON.parse(event.body) as ICreateTodo;

  await document.put({
    TableName : "users_todos",
    Item : {
        id : uuidV4(),
        title,
        user_id,
        done: false,
        deadline,
    } 
  }).promise()

  return {
    statusCode : 201,
    body: JSON.stringify({
      message: "success",
    })
  }

}