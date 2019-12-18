import { v1 } from 'uuid'
import { success, failure } from '../helpers/response'
import * as dynamoDb from '../helpers/dynamodb'

export async function handler(event) {
  const {
    service, image, recurrence, payDay, payMonth, cost,
  } = JSON.parse(event.body)

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      subscriptionId: v1(),
      service,
      image,
      recurrence,
      payDay,
      payMonth,
      cost,
    },
  }

  try {
    await dynamoDb.call('put', params)
    return success(params.Item)
  } catch (err) {
    return failure({ status: false })
  }
}
