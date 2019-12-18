import { success, failure } from '../helpers/response'
import * as dynamoDb from '../helpers/dynamodb'

export async function handler(event) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      subscriptionId: event.pathParameters.id,
    },
  }

  try {
    const result = await dynamoDb.call('get', params)
    if (result.Item) {
      return success(result.Item)
    }
    return failure({ status: false, error: 'Item not found.' })
  } catch (err) {
    return failure({ status: false })
  }
}
