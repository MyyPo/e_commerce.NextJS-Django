class HTTPError extends Error {}

const postSignup = await fetch('http://127.0.0.1:8000/api/user/create/', {
	method: 'POST',
	body: JSON.stringify({foo: true}),
	headers: {
		'content-type': 'application/json'
	}
});

if (!response.ok) {
	throw new HTTPError(`Fetch error: ${response.statusText}`);
}

const json = await response.json();


