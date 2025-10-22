const accessToken = process.env.CONTENTFUL_SECRET;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environment = process.env.CONTENTFUL_ENV;

// console.log(
// 	`AccessToken: ${accessToken}, SpaceId: ${spaceId}, environment: ${environment}`
// );

exports.handler = async (event, context) => {
	// console.log(event.body);

	const endPoint = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=products&include=1`;

	// console.log(
	// 	`AccessToken inside the handler Code Block: ${accessToken}, SpaceId: ${spaceId}, environment: ${environment}`
	// );

	try {
		const res = await fetch(endPoint);
		const data = await res.json();

		console.log(data);

		return {
			statusCode: 200,
			body: JSON.stringify({ data }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: error.message,
			}),
		};
	}
};
