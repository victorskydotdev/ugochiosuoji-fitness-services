const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_SECRET;
const environments = process.env.CONTENTFUL_ENV;

exports.handler = async (event, context) => {
	const endPoint = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environments}/entries?access_token=${accessToken}&content_type=blogContent&include=1`;

	try {
		const response = await fetch(endPoint);
		const data = await response.json();

		console.log(data);

		return {
			statusCode: 200,
			body: JSON.stringify({ data }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: error.message }),
		};
	}
};
