const mailgun = require('mailgun-js');

exports.handler = async (event, context) => {
	console.log(JSON.parse(event.body));

	try {
		const { name, email, ReasonForAppointment, additionMessage } = JSON.parse(
			event.body
		);

		const adminEmail = 'admin@ugochiosuoji.com';

		const DOMAIN = process.env.MAILGUN_DOMAIN;

		const mg = mailgun({
			apiKey: process.env.MAILGUN_SECRET,
			domain: DOMAIN,
		});

		const response = await mg.messages().send({
			from: `Booking Form Notification <admin@${DOMAIN}>`,
			to: adminEmail,
			subject: 'Contact Form Submission',

			html: `
	      <h1>Customer Info:</h1> <br />
	      <strong>Name of customer:</strong> ${name}<br />
	      <strong>Customer Email:</strong> ${email}<br />
        <strong>Reason for booking: ${ReasonForAppointment}</strong> <br />
	      <strong>Additional Booking Message:</strong> ${additionMessage},
	    `,
		});

		console.log(response);

		if (response) {
			console.log('admin email submitted successfully');

			// auto-responder to client
			const autoRes = await mg.messages().send({
				from: `Appointment <info@${DOMAIN}>`,
				to: email,
				subject: 'Thank you from Ugochi Fitness Services',

				html: `
          <h4>Hello ${name}, thank you for reaching out to us.</h4>
          <br />

          <p>Our team will respond or reach back to you as soon as possible. </p>

          <br />

          <p>...from Ugochi Fitness Services Team.</p>
        `,
			});

			return {
				statusCode: 200,

				body: JSON.stringify({
					success: true,
					message: 'client email submitted successfully',
				}),
			};
		} else {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Something happened!' }),
			};
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Email not sent:', error }),
		};
	}
};
