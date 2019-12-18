import { success, failure } from '../helpers/response'
import * as dynamoDb from '../helpers/dynamodb'

export async function handler(event) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  }

  try {
    const result = await dynamoDb.call('query', params)
    return success(result.Items)
  } catch (err) {
    return failure({ status: false })
  }
}
