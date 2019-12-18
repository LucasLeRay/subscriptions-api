import stripePackage from 'stripe'
import { success, failure } from '../helpers/response'

export async function handler(event) {
  const { source } = JSON.parse(event.body);
  const description = 'Subscriptions';
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.charges.create({
      source,
      description,
      amount: 199,
      currency: 'eur',
    });
    return success({ status: true });
  } catch (e) {
    return failure({ message: e.message });
  }
}
