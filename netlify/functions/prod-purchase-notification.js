const mailgun = require('mailgun-js');

exports.handler = async (event, context) => {
	console.log(JSON.parse(event.body));

	try {
		const { name, email, message, productName, amountPaid } = JSON.parse(
			event.body
		);

		const adminEmail = 'victorsky90@gmail.com';

		const DOMAIN = process.env.MAILGUN_DOMAIN;

		const mg = mailgun({
			apiKey: process.env.MAILGUN_SECRET,
			domain: DOMAIN,
		});

		console.log('DOMAIN:', process.env.MAILGUN_DOMAIN);
		console.log('SECRET:', process.env.MAILGUN_SECRET ? 'exists' : 'missing');

		// notification for admin
		const response = await mg.messages().send({
			from: `Product <admin@ugochiosuoji.com>`,
			to: adminEmail,
			subject: 'Product Purchase Notification',

			html: `
				<h4>Hello Admin,</h4>

				<strong>Below are details of successful product purchase on the website:</strong>
				

				<h4>Customer Info:</h4>
		    <strong>Name of customer:</strong> ${name},
		    <strong>Customer Email:</strong> ${email},
		    <strong>Additional Quote Message:</strong> ${message},
				<strong>Product Purchased:</strong> ${productName}
		  `,
		});

		if (response) {
			console.log('email submitted successfully');

			const clientPaymentRes = await mg.messages().send({
				from: `Product Purchase <admin@ugochiosuoji.com>`,
				to: email,
				subject: 'Successful Product Purchase',

				html: `
					Hello ${name}, you have successfully purchased ${productName},
					<br />
					Thank you.
				`,
			});
		} else console.log('Something happened');

		return {
			statusCode: 200,

			body: JSON.stringify({ success: true, message: 'success' }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Email not sent:', error }),
		};
	}
};
