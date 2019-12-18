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
    await dynamoDb.call('delete', params)
    return success({ status: true })
  } catch (err) {
    return failure({ status: false })
  }
}
