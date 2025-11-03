const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
const secret = process.env.PAYSTACK_SECRET_KEY;

exports.handler = async (event, context) => {
	const { email, amount } = JSON.parse(event.body);

	try {
		// Call Paystack initialize endpoint
		const response = await fetch(
			'https://api.paystack.co/transaction/initialize',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${secret}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					amount: amount * 100,
				}),
			}
		);

		const data = await response.json();

		return {
			statusCode: 200,
			body: JSON.stringify({
				data: data,
				publicKey: publicKey,
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
