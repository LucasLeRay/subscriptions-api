import * as dynamoDbLib from '../helpers/dynamodb'
import { success, failure } from '../helpers/response'

export async function handler(event) {
  const {
    service, image, recurrence, payDay, payMonth, cost,
  } = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      subscriptionId: event.pathParameters.id,
    },
    UpdateExpression: 'SET service = :service, image = :image'
    + ', recurrence = :recurrence, payDay = :payDay'
    + ', payMonth = :payMonth, cost = :cost',
    ExpressionAttributeValues: {
      ':service': service || null,
      ':image': image || null,
      ':recurrence': recurrence || null,
      ':payDay': payDay || null,
      ':payMonth': payMonth || null,
      ':cost': cost || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
