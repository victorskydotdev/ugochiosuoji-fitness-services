exports.handler = async (event, context) => {
	console.log(JSON.parse(event.body));

	return {
		statusCode: 200,

		body: JSON.stringify({ success: true, message: 'success' }),
	};
};
