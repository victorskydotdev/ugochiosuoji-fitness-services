const mailgun = require('mailgun-js');

exports.handler = async (event, context) => {
	// console.log(JSON.parse(event.body));

	try {
		const { name, email, message } = JSON.parse(event.body);

		console.log(
			'Form data from payment and order notification:',
			name,
			email,
			message
		);

		const adminEmail = 'admin@ugochiosuoji.com';

		const DOMAIN = process.env.MAILGUN_DOMAIN;

		const mg = mailgun({
			apiKey: process.env.MAILGUN_SECRET,
			domain: DOMAIN,
		});

		// console.log(DOMAIN);

		console.log('DOMAIN:', process.env.MAILGUN_DOMAIN);
		console.log('SECRET:', process.env.MAILGUN_SECRET ? 'exists' : 'missing');

		const response = await mg.messages().send({
			from: `Contact form <admin@${DOMAIN}>`,
			to: adminEmail,
			subject: 'Contact Form Submission',

			html: `
				<h1>Customer Info:</h1> <br />
		    <strong>Name of customer:</strong> ${name},
		    <strong>Customer Email:</strong> ${email},
		    <strong>Additional Quote Message:</strong> ${message},
		  `,
		});

		if (response.ok) {
			console.log('email submitted successfully');
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
