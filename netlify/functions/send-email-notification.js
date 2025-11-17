const mailgun = require('mailgun-js');

exports.handler = async (event, context) => {
	// console.log(JSON.parse(event.body));

	try {
		const { name, email, message } = JSON.parse(event.body);

		// console.log(name, email, message);

		const adminEmail = 'admin@ugochiosuoji.com';

		const DOMAIN = process.env.MAILGUN_DOMAIN;

		const mg = mailgun({
			apiKey: process.env.MAILGUN_SECRET,
			domain: DOMAIN,
		});

		console.log(DOMAIN);

		console.log('DOMAIN:', process.env.MAILGUN_DOMAIN);
		console.log('SECRET:', process.env.MAILGUN_SECRET ? 'exists' : 'missing');

		const response = await mg.messages().send({
			from: `Contact form <admin@${DOMAIN}>`,
			to: adminEmail,
			subject: 'Contact Form Submission',

			html: `
				Hello Admin, A visitor has sent in an inquiry through the contact form.
				<p>See details below.</p>

				<h3>Customer Info:</h3>
		    <strong>Name of customer:</strong> ${name},
		    <strong>Customer Email:</strong> ${email},
		    <strong>Additional Quote Message:</strong> ${message},
		  `,
		});

		if (response) {
			console.log('email submitted successfully');

			const userAutoRes = await mg.messages().send({
				from: `Ugochi Fitness Services <admin@${DOMAIN}>`,
				to: email,
				subject: 'Ugochi Fitness Services',

				html: `
					Hello ${name}, thank you for contacting us.

					<p>Our team will respond as soon as possible.</p>

					<div style="margin-bottom: 1.5em; display: inline-block; padding: 1.5em; background: #132b18; border-radius: 8px; color: #fff;">
						<strong style="display: inline-block; margin-bottom: 1em;">In the meantime, you can take a look at our programs and products</strong>

						<button style="display: inline-block; border: none; background: #bbf816; color: #132b18; padding: .9em 1.1em;">
							<a href="https://www.ugochiosuoji.com/programs" style="border-radius: 8px; font-weight: bold; text-decoration: none; color: #132b18;" >Click here</a>
						</button>
					</div>

					<em style="display: block;>Team, Ugochi Fitness Services</em>
				`,
			});

			return {
				statusCode: 200,

				body: JSON.stringify({ success: true, message: 'success' }),
			};
		} else console.log('Something happened');
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Email not sent:', error }),
		};
	}
};
