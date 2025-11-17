const mailgun = require('mailgun-js');

exports.handler = async (event, context) => {
	console.log(JSON.parse(event.body));

	try {
		const { name, email, ReasonForAppointment, additionalMessage } = JSON.parse(
			event.body
		);

		const adminEmail = 'admin@ugochiosuoji.com';

		const DOMAIN = process.env.MAILGUN_DOMAIN;

		const mg = mailgun({
			apiKey: process.env.MAILGUN_SECRET,
			domain: DOMAIN,
		});

		const availBookings = {
			In_person_coaching_experience: 'In-Person Coaching',
			Speaking_engagement_Workout_breakout_sessions:
				'Speaking Engaging/Workout Breakout Sessions',
			Speaking_engagement_Workout_breakout_sessions:
				'Corporate & Community Wellness Program',
		};

		const formattedReason = availBookings[ReasonForAppointment];

		const response = await mg.messages().send({
			from: `Booking Form Notification <admin@${DOMAIN}>`,
			to: adminEmail,
			subject: 'Contact Form Submission',

			html: `
					Hello Admin, a new client has booked an appointment with you.

					Find client details and info below

					<h4>Customer Info:</h4>
					<strong>Name of customer:</strong> ${name}<br />
					<strong style="margin-bottom: .7em;">Customer Email:</strong> ${email}<br />
					<strong style="display: inline-block; padding: 1.1em; background: #3a8449; color: #fff; margin-bottom: .5em;">Reason for booking: ${formattedReason}</strong> <br />
					<strong>Additional Booking Message:</strong> ${additionalMessage},
		  `,
		});

		if (response) {
			console.log('admin email submitted successfully');

			// auto-responder to client
			const autoRes = await mg.messages().send({
				from: `Appointment <admin@${DOMAIN}>`,
				to: email,
				subject: 'Ugochi Fitness Services',

				html: `
		      <h4>Hello ${name},</h4>

					<p>You have successfully booked for:</p>
					<strong style="display: inline-block; padding: 1.1em; background: #3a8449; color: #fff; margin-bottom: .8em;">Reason for booking: ${formattedReason}</strong> <br />

		      <p>You'll be contacted as soon as possible to discuss further the details and see how we proceed</p>

					<strong>Team, Ugochi Osuoji</strong>
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
