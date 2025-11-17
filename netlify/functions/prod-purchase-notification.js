const mailgun = require('mailgun-js');

exports.handler = async (event, context) => {
	console.log(JSON.parse(event.body));

	try {
		const { name, email, phone, productName, amountPaid, quantity } =
			JSON.parse(event.body);

		const adminEmail = 'admin@ugochiosuoji.com';

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
		    <strong>Name of customer:</strong> ${name}, <br />
		    <strong>Customer Email:</strong> ${email}, <br />
		    <strong>Customer Phone:</strong> ${phone}, <br />
		    
				<strong>Product Purchased:</strong> ${productName} <br />
				<strong>Quantity:</strong> ${quantity} <br />
				<strong>Total Amount Paid:</strong> ${amountPaid} <br />
		  `,
		});

		if (response) {
			console.log('email submitted successfully');

			const clientPaymentRes = await mg.messages().send({
				from: `Product Purchase <admin@ugochiosuoji.com>`,
				to: email,
				subject: 'Successful Product Purchase',

				html: `
					Hello <strong>${name}</strong>, you have successfully purchased <strong>${quantity}</strong> units of <strong>${productName}</strong>,
					<br />

					Thank you for your purchase. Your order is being processed and a member of our team will reach out to you to confirm your order.

					<br />

					Also, you'll receive or have already received a payment receipt validating your order.

					<br />

					<strong><em>Team, Ugochi Fitness Services</em></strong>


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
